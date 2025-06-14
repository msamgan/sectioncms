<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Concerns\NotificationFunctions;
use App\Models\Business;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class BusinessUpdated extends Notification implements ShouldQueue
{
    use NotificationFunctions;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private readonly Business $business, private readonly ?User $initiator = null) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return $notifiable->notifiableVia();
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $notification = $this->notificationGenerator(
            notifiable: $this->initiator ?? auth()->user(),
            entity: 'Business',
            entityName: $this->business->name
        );

        return (new MailMessage)
            ->subject($notification['updateSubject'])
            ->line($notification['updateTitle'])
            ->action('Notifications', url('notifications'))
            ->line($notification['updateMessage'])
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $notification = $this->notificationGenerator(
            notifiable: $this->initiator ?? auth()->user(),
            entity: 'Business',
            entityName: $this->business->name
        );

        return [
            'title' => $notification['updateTitle'],
            'message' => $notification['updateMessage'],
        ];
    }
}

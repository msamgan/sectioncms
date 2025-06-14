<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Concerns\NotificationFunctions;
use App\Models\Language;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class LanguageCreated extends Notification implements ShouldQueue
{
    use NotificationFunctions;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private readonly Language $language, private readonly User $initiator) {}

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
            notifiable: $this->initiator,
            entity: 'Language',
            entityName: $this->language->key('name'),
        );

        return (new MailMessage)
            ->subject($notification['createSubject'])
            ->line($notification['createTitle'])
            ->action('Notifications', url('notifications'))
            ->line($notification['createMessage'])
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
            notifiable: $this->initiator,
            entity: 'Language',
            entityName: $this->language->key('name'),
        );

        return [
            'title' => $notification['createTitle'],
            'message' => $notification['createMessage'],
        ];
    }
}

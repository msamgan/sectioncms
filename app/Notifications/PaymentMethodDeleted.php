<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Concerns\NotificationFunctions;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class PaymentMethodDeleted extends Notification implements ShouldQueue
{
    use NotificationFunctions;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct() {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $notification = $this->notificationGenerator(
            notifiable: $notifiable,
            entity: 'Payment Method',
            entityName: 'Payment Method',
        );

        return (new MailMessage)
            ->subject($notification['deleteSubject'])
            ->line($notification['deleteTitle'])
            ->action('Notifications', url('notifications'))
            ->line($notification['deleteMessage'])
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
            notifiable: $notifiable,
            entity: '',
            entityName: '',
        );

        return [
            'title' => $notification['deleteTitle'],
            'message' => $notification['deleteMessage'],
        ];
    }
}

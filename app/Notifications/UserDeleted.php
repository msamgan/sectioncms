<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Concerns\NotificationFunctions;
use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class UserDeleted extends Notification
{
    use NotificationFunctions;

    /**
     * Create a new notification instance.
     */
    public function __construct(private readonly User $newUser) {}

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
            entity: 'User',
            entityName: $this->newUser->key('name'),
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
            entity: 'User',
            entityName: $this->newUser->key('name'),
        );

        return [
            'title' => $notification['deleteTitle'],
            'message' => $notification['deleteMessage'],
        ];
    }
}

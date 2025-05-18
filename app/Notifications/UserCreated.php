<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Concerns\NotificationFunctions;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Spatie\Permission\Models\Role;

final class UserCreated extends Notification implements ShouldQueue
{
    use NotificationFunctions;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private readonly User $newUser, private readonly \Spatie\Permission\Contracts\Role|Role $role) {}

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
            entityName: $this->newUser->key('name') . ' with role ' . $this->role->display_name,
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
            notifiable: $notifiable,
            entity: 'User',
            entityName: $this->newUser->key('name') . ' with role ' . $this->role->display_name,
        );

        return [
            'title' => $notification['createTitle'],
            'message' => $notification['createMessage'],
        ];
    }
}

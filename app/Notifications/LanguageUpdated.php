<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class LanguageUpdated extends Notification // implements ShouldQueue
{
    /**
     * Create a new notification instance.
     */
    public function __construct(private readonly User $user) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        now()->format('F j, Y, g:i a');

        return [
            'title' => 'Language Updated',
            'message' => 'Language has been updated successfully by ' . $this->user->name . ' on ' . now()->format('F j, Y, g:i a'),
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Notifications;

use Browser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class LoggedIn extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

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
        $dataTime = now()->format('F j, Y, g:i a');
        $browser = Browser::browserName();
        $device = Browser::deviceType();
        $message = 'You have been logged in on ' . $dataTime . '. With a ' . $device . '. Using ' . $browser . '.';

        return (new MailMessage)
            ->subject(config('app.name') . ' - Logged In')
            ->line('You have been logged in.')
            ->action('Notifications', url('notifications'))
            ->line($message)
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $dataTime = now()->format('F j, Y, g:i a');
        $browser = Browser::browserName();
        $device = Browser::deviceType();

        $message = 'You have been logged in on ' . $dataTime . '. With a ' . $device . '. Using ' . $browser . '.';

        return [
            'title' => 'Logged In',
            'message' => $message,
        ];
    }
}

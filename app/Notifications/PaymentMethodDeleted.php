<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Concerns\NotificationFunctions;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Laravel\Cashier\PaymentMethod;

final class PaymentMethodDeleted extends Notification implements ShouldQueue
{
    use NotificationFunctions;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private PaymentMethod $paymentMethod,
        private readonly User $initiator
    ) {}

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
        $lastFourDigits = $this->paymentMethod->card->last4 ?? 'N/A';

        $notification = $this->notificationGenerator(
            notifiable: $this->initiator,
            entity: 'Payment Method',
            entityName: $lastFourDigits
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
        $lastFourDigits = $this->paymentMethod->card->last4 ?? 'N/A';

        $notification = $this->notificationGenerator(
            notifiable: $this->initiator,
            entity: 'Payment Method',
            entityName: $lastFourDigits
        );

        return [
            'title' => $notification['deleteTitle'],
            'message' => $notification['deleteMessage'],
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Actions\PaymentMethod;

final class CreatePaymentMethod
{
    public function handle(array $data): void
    {
        auth()->user()->addPaymentMethod($data['payment_method']);
    }
}

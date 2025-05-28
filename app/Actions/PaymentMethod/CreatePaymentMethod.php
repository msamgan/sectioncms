<?php

declare(strict_types=1);

namespace App\Actions\PaymentMethod;

use Laravel\Cashier\PaymentMethod;

final class CreatePaymentMethod
{
    public function handle(array $data): PaymentMethod
    {
        return auth()->user()->addPaymentMethod($data['payment_method']);
    }
}

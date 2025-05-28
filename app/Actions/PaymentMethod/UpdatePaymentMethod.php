<?php

declare(strict_types=1);

namespace App\Actions\PaymentMethod;

use App\Models\PaymentMethod;

final class UpdatePaymentMethod
{
    public function handle(PaymentMethod $paymentMethod, array $data): PaymentMethod
    {
        $paymentMethod->update($data);

        return $paymentMethod;
    }
}

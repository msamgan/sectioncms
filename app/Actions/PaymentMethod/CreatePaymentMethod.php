<?php

declare(strict_types=1);

namespace App\Actions\PaymentMethod;

use App\Models\PaymentMethod;

final class CreatePaymentMethod
{
    public function handle(array $data): PaymentMethod
    {
        return PaymentMethod::query()->create($data);
    }
}

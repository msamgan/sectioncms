<?php

declare(strict_types=1);

namespace App\Actions\Business;

use App\Models\Business;
use App\Models\User;
use Random\RandomException;

final class CreateBusiness
{
    /**
     * @throws RandomException
     */
    public function handle(User $user, string $businessName, bool $makeBusinessActive = false): Business
    {
        $business = Business::query()->create([
            'user_id' => $user->getKey(),
            'name' => $businessName,
            'token' => Business::generateToken(),
        ]);

        if ($makeBusinessActive) {
            $user->saveKey('business_id', $business->getKey());
        }

        return $business;
    }
}

<?php

declare(strict_types=1);

namespace App\Actions\Business;

use App\Enums\ResourceEnum;
use App\Models\ResourceTracking;

final class CreateAllowedResources
{
    public function handle(): void
    {
        foreach (ResourceEnum::cases() as $case) {
            ResourceTracking::query()->create([
                'business_id' => auth()->user()->key('business_id'),
                'type' => $case->label(),
                'unit' => $case->unit(),
                'allowed' => $case->allowed(),
                'charges' => $case->changes(),
            ]);
        }
    }
}

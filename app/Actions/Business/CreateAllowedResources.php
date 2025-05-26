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
                'user_id' => auth()->id(),
                'type' => $case->label(),
                'unit' => $case->unit(),
                'allowed' => $case->allowed(),
                'used' => $case->label() === ResourceEnum::WEBSITE->label() || $case->label() === ResourceEnum::LANGUAGES->label() ? 1 : 0,
                'changeable' => 0,
                'charges' => $case->changes(),
            ]);
        }
    }
}

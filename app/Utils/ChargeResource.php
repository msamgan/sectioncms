<?php

declare(strict_types=1);

namespace App\Utils;

use App\Enums\ResourceEnum;
use App\Stores\LanguageStore;
use App\Stores\ResourceTrackingStore;

final class ChargeResource
{
    public static function language(int $businessId, ?bool $forAll = false): int|float
    {
        $resourceTracking = ResourceTrackingStore::tracking(businessId: $businessId, type: ResourceEnum::LANGUAGES->label());

        $chargeableLanguages = $resourceTracking->key('allowed') - LanguageStore::languageCount(businessId: $businessId);

        $charge = $chargeableLanguages > 0
            ? round(self::calculateDaysMultiplier() * $resourceTracking->key('charges'), 2)
            : 0;

        return $forAll ? $chargeableLanguages * $charge : $charge;
    }

    private static function calculateDaysMultiplier(): float
    {
        return round(floor(now()->startOfDay()->diffInDays(now()->endOfMonth())) / now()->daysInMonth, 2);
    }
}

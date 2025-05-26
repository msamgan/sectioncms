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
        return self::calculateCharges(
            businessId: $businessId,
            type: ResourceEnum::LANGUAGES->label(),
            entityCount: LanguageStore::languageCount(businessId: $businessId),
            forAll: $forAll
        );
    }

    private static function calculateCharges(int $businessId, string $type, int $entityCount, bool $forAll): int|float
    {
        $resourceTracking = ResourceTrackingStore::tracking(businessId: $businessId, type: $type);
        $chargeable = $resourceTracking->key('allowed') - $entityCount;

        if ($chargeable <= 0) {
            return 0;
        }

        $charge = round(self::calculateDaysMultiplier() * $resourceTracking->key('charges'), 2);

        if ($forAll) {
            return $chargeable * $charge;
        }

        return $charge;
    }

    private static function calculateDaysMultiplier(): float
    {
        return round(ceil(now()->startOfDay()->diffInDays(now()->endOfMonth())) / now()->daysInMonth, 2);
    }
}

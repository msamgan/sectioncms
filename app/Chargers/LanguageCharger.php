<?php

declare(strict_types=1);

namespace App\Chargers;

use App\Enums\ResourceEnum;
use App\Stores\LanguageStore;
use App\Stores\ResourceTrackingStore;

final readonly class LanguageCharger
{
    private mixed $languageTracking;

    public function __construct(private int $businessId
    ) {
        $this->languageTracking = ResourceTrackingStore::tracking(businessId: $this->businessId, type: ResourceEnum::LANGUAGES->value);
    }

    public function getAllowed(): int
    {
        return $this->languageTracking?->key('allowed') ?? ResourceEnum::LANGUAGES->allowed();
    }

    public function getChanges(): float
    {
        return $this->languageTracking?->key('charges') ?? ResourceEnum::LANGUAGES->changes();
    }

    public function getUnit(): string
    {
        return $this->languageTracking?->key('unit') ?? ResourceEnum::LANGUAGES->unit();
    }

    public function getChargeableUnits(): int
    {
        $languageCount = LanguageStore::languageCount(businessId: $this->businessId);
        $allowed = $this->getAllowed();

        if ($languageCount <= $allowed) {
            return 0;
        }

        $chargeableUnits = $languageCount - $allowed;

        if ($chargeableUnits <= 0) {
            return 0;
        }

        // Check if any languages were created today and charge for only them
        $languageCountCreatedToday = (bool) LanguageStore::languageCountCreatedToday(businessId: $this->businessId);

        if ($languageCountCreatedToday) {
            return $chargeableUnits;
        }

        return 0;
    }
}

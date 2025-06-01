<?php

declare(strict_types=1);

namespace App\Chargers;

use App\Concerns\ChargerFunctions;
use App\Enums\ResourceEnum;
use App\Stores\LanguageStore;
use App\Stores\ResourceTrackingStore;

final readonly class LanguageCharger
{
    use ChargerFunctions;

    private mixed $languageTracking;

    public function __construct(private int $businessId
    ) {
        $this->languageTracking = ResourceTrackingStore::tracking(businessId: $this->businessId, type: ResourceEnum::LANGUAGES->value);
    }

    public function getUnit(): string
    {
        return $this->languageTracking?->key('unit') ?? ResourceEnum::LANGUAGES->unit();
    }

    public function proRateCharges(): array
    {
        $langCreatedToday = LanguageStore::languageCountCreatedToday(businessId: $this->businessId);
        $chargeableUnits = $this->getChargeableUnits();

        if ($langCreatedToday <= 0 || $chargeableUnits <= 0) {
            return [
                'amount' => 0,
                'chargeableUnits' => 0,
                'changes' => $this->getChanges(),
                'daysMultiplier' => $this->calculateDaysMultiplier(),
            ];
        }

        return [
            'amount' => $this->getChanges() * $this->calculateDaysMultiplier() * min($chargeableUnits, $langCreatedToday),
            'chargeableUnits' => min($chargeableUnits, $langCreatedToday),
            'changes' => $this->getChanges(),
            'chargesInDollars' => number_format($this->getChanges() / 100, 2),
            'daysMultiplier' => $this->calculateDaysMultiplier(),
        ];
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

        return $chargeableUnits;
    }

    public function getAllowed(): int
    {
        return $this->languageTracking?->key('allowed') ?? ResourceEnum::LANGUAGES->allowed();
    }

    public function getChanges(): float
    {
        return $this->languageTracking?->key('charges') ?? ResourceEnum::LANGUAGES->changes();
    }
}

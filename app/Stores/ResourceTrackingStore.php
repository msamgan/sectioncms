<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\ResourceTracking;

final class ResourceTrackingStore
{
    public static function tracking(int $businessId, string $type): ?ResourceTracking
    {
        return ResourceTracking::query()
            ->where('business_id', $businessId)
            ->where('type', $type)->first();
    }
}

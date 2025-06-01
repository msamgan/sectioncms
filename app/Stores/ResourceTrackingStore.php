<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\ResourceTracking;
use Illuminate\Database\Eloquent\Collection;

final class ResourceTrackingStore
{
    public static function tracking(int $businessId, string $type): ?ResourceTracking
    {
        return ResourceTracking::query()
            ->where('business_id', $businessId)
            ->where('type', $type)->first();
    }

    public static function businessTracking(int $businessId): Collection
    {
        return ResourceTracking::query()
            ->where('business_id', $businessId)
            ->get();
    }
}

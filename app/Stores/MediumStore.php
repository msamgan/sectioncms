<?php

declare(strict_types=1);

namespace App\Stores;

use Illuminate\Support\Collection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

final class MediumStore
{
    public static function media(int $businessId, ?string $q = null): Collection
    {
        return Media::query()->where('custom_properties->businessId', $businessId)
            ->when($q, function ($query) use ($q): void {
                $query->where('name', 'like', '%' . $q . '%');
            })->get()->map(fn ($medium): array => self::mapMedium($medium));
    }

    public static function mapMedium(Media $medium): array
    {
        return [
            'id' => $medium->getKey(),
            'url' => $medium->getUrl(),
            'name' => $medium->name,
            'type' => $medium->mime_type,
            'size' => $medium->size,
            'preview' => $medium->getUrl(),
        ];
    }

    public static function mediaSize(int $businessId): float
    {
        return Media::query()
            ->where('custom_properties->businessId', $businessId)
            ->sum('size');
    }
}

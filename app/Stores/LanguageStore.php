<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Language;
use Illuminate\Database\Eloquent\Collection;

final class LanguageStore
{
    public static function languages(int $businessId, ?string $query): Collection
    {
        return Language::query()->where('business_id', $businessId)
            ->orderBy('created_at', 'Asc')
            ->when($query, function ($query): void {
                $query->where('name', 'like', '%' . $query . '%')
                    ->orWhere('code', 'like', '%' . $query . '%');
            })->get();
    }

    public static function languageCount(int $businessId): int
    {
        return Language::query()->where('business_id', $businessId)->count();
    }

    public static function languageCountCreatedToday(int $businessId): int
    {
        return Language::query()
            ->where('business_id', $businessId)->whereDate('created_at', now()->toDateString())->count();
    }
}

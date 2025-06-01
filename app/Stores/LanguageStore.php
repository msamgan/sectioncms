<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Language;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\ConnectionException;

final class LanguageStore
{
    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    public static function languages(int $businessId, ?string $query): Collection
    {
        return self::languageBaseQuery(businessId: $businessId, q: $query)->get();
    }

    public static function languageBaseQuery(int $businessId, ?string $q = null)
    {
        return Language::query()->where('business_id', $businessId)
            ->orderBy('created_at', 'Asc')
            ->when($q, function ($query) use ($q): void {
                $query->where('name', 'like', '%' . $q . '%')
                    ->orWhere('code', 'like', '%' . $q . '%');
            });
    }

    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    public static function activeLanguages(int $businessId, ?string $query = null): Collection
    {
        return self::languageBaseQuery(businessId: $businessId, q: $query)->where('is_active', true)->get();
    }

    public static function languageCount(int $businessId): int
    {
        return Language::query()->where('business_id', $businessId)->count();
    }
}

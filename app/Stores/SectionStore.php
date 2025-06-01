<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Section;
use App\Models\SectionValue;
use Illuminate\Database\Eloquent\Collection;

final class SectionStore
{
    public static function mapSection(Section $section): array
    {
        $count = 1;

        return [
            'id' => $section->id,
            'name' => $section->key('name'),
            'fields' => $section->keys->map(function ($key) use (&$count): array {
                $valueArray = [];
                $key->values->map(function ($value) use (&$valueArray): void {
                    $valueArray[$value->lang] = $value->value;
                });

                return [
                    'id' => $count++,
                    'key' => $key->key,
                    'value' => $valueArray,
                ];
            }),
        ];
    }

    public static function mapSectionApi(Section $section, string $langCode): array
    {
        return [
            'name' => $section->key('name'),
            'lang' => $langCode,
            'fields' => $section->keys->map(fn ($key): array => [
                'key' => $key->key,
                'value' => $key->values->where('lang', $langCode)->first()->value,
            ])->keyBy('key')->map(fn ($item) => $item['value'])->toArray(),
        ];
    }

    public static function deleteKeysAndValues(Section $section): void
    {
        $section->keys->each(function ($key): void {
            $key->values()->delete();
            $key->delete();
        });
    }

    public static function businessLangValues(int $businessId, string $langCode = 'en'): Collection
    {
        return SectionValue::query()
            ->where('business_id', $businessId)
            ->where('lang', $langCode)
            ->get();
    }

    public static function sectionByLang(string $sectionSlug, string $langCode, int $businessId): ?Section
    {
        return Section::query()->where('slug', $sectionSlug)
            ->where('business_id', $businessId)
            ->with(['keys' => function ($query) use ($langCode): void {
                $query->with(['values' => function ($query) use ($langCode): void {
                    $query->where('lang', $langCode);
                }]);
            }, 'keys.values'])
            ->first();
    }
}

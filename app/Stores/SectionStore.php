<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Section;

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

    public static function deleteKeysAndValues(Section $section): void
    {
        $section->keys->each(function ($key): void {
            $key->values()->delete();
            $key->delete();
        });
    }
}

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
            'name' => $section->key('name'),
            'fields' => $section->keys->map(function ($key) use (&$count) {
                $valueArray = [];
                $key->values->map(function ($value) use (&$valueArray) {
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
}

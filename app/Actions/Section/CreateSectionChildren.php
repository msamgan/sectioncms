<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Models\Section;
use App\Models\SectionKey;
use App\Models\SectionValue;

final class CreateSectionChildren
{
    public function handle(Section $section, array $fields): void
    {
        foreach ($fields as $field) {
            $sectionKey = SectionKey::query()->create(['key' => $field['key'], 'section_id' => $section->getKey()]);
            foreach ($field['value'] as $lang => $value) {
                SectionValue::query()->create(['value' => $value, 'section_key_id' => $sectionKey->getKey(), 'lang' => $lang]);
            }
        }
    }
}

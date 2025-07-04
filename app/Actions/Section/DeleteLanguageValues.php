<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Stores\SectionStore;

final class DeleteLanguageValues
{
    public function handle(string $languageCode): void
    {
        foreach (SectionStore::businessLangValues(
            businessId: auth()->businessId(),
            langCode: $languageCode
        ) as $sectionValue) {
            $sectionValue->delete();
        }
    }
}

<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Stores\SectionStore;

final class UpdateLanguageValues
{
    public function handle(string $languageCode, string $newLanguageCode): void
    {
        $businessSectionValues = SectionStore::businessLangValues(businessId: auth()->businessId(), langCode: $languageCode);

        foreach ($businessSectionValues as $sectionValue) {
            $sectionValue->update(['lang' => $newLanguageCode]);
        }
    }
}

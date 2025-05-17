<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Stores\SectionStore;

final class CreateLanguageValues
{
    public function handle(string $languageCode): void
    {
        $businessSectionValues = SectionStore::businessLangValues(businessId: auth()->user()->key('business_id'));

        foreach ($businessSectionValues as $sectionValue) {
            $newValue = $sectionValue->replicate();
            $newValue->lang = $languageCode;
            $newValue->save();
        }
    }
}

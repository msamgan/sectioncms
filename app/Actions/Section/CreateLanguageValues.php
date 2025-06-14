<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Jobs\Translate;
use App\Stores\LanguageStore;
use App\Stores\SectionStore;

final class CreateLanguageValues
{
    public function handle(string $languageCode): void
    {
        $defaultLanguage = LanguageStore::defaultLanguage(businessId: auth()->businessId());
        $businessSectionValues = SectionStore::businessLangValues(businessId: auth()->businessId(), langCode: $defaultLanguage->key('code'));

        $autoTranslate = auth()->user()->key('business')->key('auto_translation');

        foreach ($businessSectionValues as $sectionValue) {
            $newValue = $sectionValue->replicate();
            $newValue->lang = $languageCode;
            $newValue->save();
            $newValue = $newValue->refresh();

            if ($autoTranslate) {
                Translate::dispatch(sectionValueId: $newValue->key('id'));
            }
        }
    }
}

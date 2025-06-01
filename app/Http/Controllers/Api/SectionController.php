<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SectionApiRequest;
use App\Models\Section;
use App\Stores\LanguageStore;
use App\Stores\SectionStore;
use Exception;

final class SectionController extends Controller
{
    /**
     * Section data
     */
    public function index(SectionApiRequest $request)
    {
        try {
            $defaultLanguage = LanguageStore::defaultLanguage(businessId: $request->get('business')->getKey());

            $section = SectionStore::sectionByLang(
                sectionSlug: $request->input('id'),
                langCode: $request->input('lang', $defaultLanguage->key('code')),
                businessId: $request->get('business')->getKey()
            );

            if (! $section instanceof Section) {
                return response()->notFound(slug: $request->input('id'));
            }

            return response()->ok(payload: SectionStore::mapSectionApi(
                section: $section,
                langCode: $request->input('lang', 'en')
            ));
        } catch (Exception) {
            return response()->error();
        }
    }
}

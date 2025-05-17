<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Concerns\ApiResponses;
use App\Http\Controllers\Controller;
use App\Http\Requests\SectionApiRequest;
use App\Models\Section;
use App\Stores\SectionStore;
use Exception;

final class SectionController extends Controller
{
    use ApiResponses;

    /**
     * Section data
     */
    public function index(SectionApiRequest $request)
    {
        try {
            $section = SectionStore::sectionByLang(
                sectionSlug: $request->input('id'),
                langCode: $request->input('lang', 'en'),
                businessId: $request->get('business')->getKey()
            );

            if (! $section instanceof Section) {
                return $this->notFound($request->input('id'));
            }

            return $this->ok(payload: SectionStore::mapSectionApi(
                section: $section,
                langCode: $request->input('lang', 'en')
            ));
        } catch (Exception) {
            return $this->error();
        }
    }
}

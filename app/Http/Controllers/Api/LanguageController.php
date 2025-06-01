<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Concerns\ApiResponses;
use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Stores\LanguageStore;
use Illuminate\Http\Request;

final class LanguageController extends Controller
{
    use ApiResponses;

    /**
     * Languages
     */
    public function index(Request $request)
    {
        return $this->ok(
            payload: LanguageStore::languageBaseQuery(businessId: $request->get('business')->getKey())
                ->where('is_active', true)->get()->map(
                    fn (Language $language): array => [
                        'name' => $language->key('name'),
                        'code' => $language->key('code'),
                    ]
                )
        );
    }
}

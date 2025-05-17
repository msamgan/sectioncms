<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Concerns\ApiResponses;
use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;

final class LanguageController extends Controller
{
    use ApiResponses;

    public function index(Request $request)
    {
        return $this->ok(
            payload: Language::query()->where('business_id', $request->get('business')->getKey())->get()
                ->map(
                    fn (Language $language): array => [
                        'name' => $language->key('name'),
                        'code' => $language->key('code'),
                    ]
                )
        );
    }
}

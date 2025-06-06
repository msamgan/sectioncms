<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Adapters\TranslationAdapter;
use App\Http\Requests\TranslationRequest;
use App\Stores\LanguageStore;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Msamgan\Lact\Attributes\Action;
use Throwable;

final class TranslationController extends Controller
{
    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     * @throws Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business'])]
    public function translate(TranslationRequest $request, TranslationAdapter $translationAdapter): JsonResponse
    {
        $languageCode = $request->validated('language');
        $value = $request->validated('value');

        $languages = LanguageStore::activeLanguages(businessId: auth()->businessId())->filter(fn ($language): bool => $language->code !== $languageCode);

        $responseArray = [];
        foreach ($languages as $language) {
            $translation = $translationAdapter->translate(language: $language->key('name'), query: $value);
            $responseArray[$language->code] = trimString($translation['response']);
        }

        return response()->ok(payload: $responseArray);
    }
}

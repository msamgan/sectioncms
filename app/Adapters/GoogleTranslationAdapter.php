<?php

declare(strict_types=1);

namespace App\Adapters;

use Google\ApiCore\ApiException;
use Google\ApiCore\ValidationException;
use Google\Cloud\Translate\V3\Client\TranslationServiceClient;
use Google\Cloud\Translate\V3\GetSupportedLanguagesRequest;
use Google\Cloud\Translate\V3\TranslateTextRequest;

final class GoogleTranslationAdapter
{
    /**
     * @throws ValidationException
     * @throws ApiException
     */
    public function translate(string $languageCode, string $query): string
    {
        $client = $this->getTranslationClient();

        $parent = $this->getParent($client);

        $response = $client->translateText((new TranslateTextRequest())
            ->setParent($parent)
            ->setTargetLanguageCode($languageCode)
            ->setMimeType('text/plain')
            ->setContents([$query])
        );

        return $response->getTranslations()[0]->getTranslatedText();
    }

    /**
     * @throws ValidationException
     * @throws ApiException
     */
    public function getSupportedLanguages(): array
    {
        $client = $this->getTranslationClient();

        $parent = $this->getParent($client);

        $request = (new GetSupportedLanguagesRequest())->setParent($parent);

        return array_map(fn ($language) => $language->getLanguageCode(), iterator_to_array($client->getSupportedLanguages($request)->getLanguages()));
    }

    public function getParent(TranslationServiceClient $client): string
    {
        return $client->locationName((string) config('translation.google.project_id'), (string) config('translation.google.location'));
    }

    /**
     * @throws ValidationException
     */
    private function getTranslationClient(): TranslationServiceClient
    {
        return new TranslationServiceClient([
            'credentials' => storage_path('section-cms.json'),
        ]);
    }
}

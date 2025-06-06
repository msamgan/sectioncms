<?php

declare(strict_types=1);

namespace App\Adapters;

use Google\ApiCore\ApiException;
use Google\ApiCore\ValidationException;
use Google\Cloud\Translate\V3\Client\TranslationServiceClient;
use Google\Cloud\Translate\V3\TranslateTextRequest;

final class GoogleTranslationAdapter
{
    private string $projectId = 'section-cms';

    private string $location = 'global'; // or 'us-central1' if you specified a regional endpoint

    /**
     * @throws ValidationException
     * @throws ApiException
     */
    public function translate(string $languageCode, string $query): string
    {
        $client = new TranslationServiceClient([
            'credentials' => storage_path('section-cms.json'),
        ]);

        $parent = $client->locationName($this->projectId, $this->location);

        // Build the request using the TranslateTextRequest object
        $request = (new TranslateTextRequest())
            ->setParent($parent)
            ->setTargetLanguageCode($languageCode)
            ->setMimeType('text/plain')
            ->setContents([$query]);

        $response = $client->translateText($request);

        return $response->getTranslations()[0]->getTranslatedText();
    }
}

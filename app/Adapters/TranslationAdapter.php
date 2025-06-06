<?php

declare(strict_types=1);

namespace App\Adapters;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Throwable;

final class TranslationAdapter
{
    private const string BASE_URL = 'http://127.0.0.1:11434';

    private const string MODEL = 'llama3:8b';

    /**
     * @throws ConnectionException
     * @throws Throwable
     */
    public function translate(string $language, string $query): array
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(self::BASE_URL . '/api/generate', $this->mapper(language: $language, query: $query));

        throw_if($response->failed(), new ConnectionException('Failed to connect to the translation service.'));

        return $response->json();
    }

    private function mapper(string $language, string $query): array
    {
        return [
            'model' => self::MODEL,
            'prompt' => $this->prompter(language: $language, query: $query),
            'stream' => false,
            'format' => [
                'type' => 'string',
                'properties' => [
                    'translation' => [
                        'type' => 'string',
                    ],
                ],
                'required' => ['translation'],
            ],
        ];
    }

    private function prompter(string $language, string $query, ?string $fromLanguage = null): string
    {
        if ($fromLanguage === null) {
            $fromLanguage = 'English';
        }

        return <<<PROMPT
                    You are a professional-grade language translator fluent in $fromLanguage and $language. Translate the following text from $fromLanguage to $language with a high degree of linguistic and contextual accuracy.

                    Guidelines:
                    - Maintain the original meaning and tone.
                    - Use natural and idiomatic expressions in the target language.
                    - Preserve formality, technical terms, or slang appropriately.
                    - Do not include any explanations or alternate versions.
                    - Do not skip or alter content.
                    - Format the output as plain text in $language only.
                    - If the input includes code, names, or acronyms, preserve them as-is.

                    Text to translate:
                    """
                    $query
                    """
                    PROMPT;
    }
}

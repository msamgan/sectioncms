<?php

declare(strict_types=1);

namespace App\Adapters;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Throwable;

final class TranslationAdapter
{
    private const string BASE_URL = 'http://127.0.0.1:11434';

    private const string MODEL = 'mistral-nemo:latest';

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

    private function prompter(string $language, string $query): string
    {
        return "Translate the following text to {$language} with a formal tone:\n\n{$query}";
    }
}

<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Adapters\GoogleTranslationAdapter;
use Google\ApiCore\ApiException;
use Google\ApiCore\ValidationException;
use Illuminate\Console\Command;

final class TestTranslationAdapter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:translate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translation...';

    /**
     * Execute the console command.
     *
     * @throws ValidationException
     * @throws ApiException
     */
    public function handle(GoogleTranslationAdapter $googleTranslationAdapter): void
    {
        $translation = $googleTranslationAdapter->translate(
            languageCode: 'zh-TW',
            query: 'Hello, how are you?'
        );

        $this->info('Google Translation: ' . $translation);

        $supportedLanguages = $googleTranslationAdapter->getSupportedLanguages();

        $this->info('Supported Languages: ' . implode(', ', $supportedLanguages));
    }
}

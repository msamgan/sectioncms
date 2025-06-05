<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Adapters\TranslationAdapter;
use Exception;
use Illuminate\Console\Command;
use Throwable;

use function Laravel\Prompts\text;

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
     */
    public function handle(TranslationAdapter $translationAdapter): void
    {
        $language = text('Enter the language to translate to (e.g., "French"):');
        $query = text('Enter the query to translate:');

        if (empty($language) || empty($query)) {
            $this->error('Language and query cannot be empty.');

            return;
        }
        $language = mb_trim($language);
        $query = mb_trim($query);

        try {
            $response = $translationAdapter->translate($language, $query);

            $this->line('Original Query: ' . $query);
            $this->line('Language: ' . $language);
            $this->line('Translated Response: ' . $response['response']);

        } catch (Exception $e) {
            $this->error('Translation failed: ' . $e->getMessage());
        } catch (Throwable $e) {
            $this->error('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}

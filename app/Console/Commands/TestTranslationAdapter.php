<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Adapters\TranslationAdapter;
use Google\ApiCore\ApiException;
use Google\ApiCore\ValidationException;
use Google\Cloud\Translate\V3\Client\TranslationServiceClient;
use Google\Cloud\Translate\V3\TranslateTextRequest;
use Illuminate\Console\Command;

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
     *
     * @throws ValidationException
     * @throws ApiException
     */
    public function handle(TranslationAdapter $translationAdapter): void
    {
        $language = text('Enter the language to translate to (e.g., "French"):');
        $query = text('Enter the query to translate:');

        if ($language === '' || $language === '0' || ($query === '' || $query === '0')) {
            $this->error('Language and query cannot be empty.');

            return;
        }
        $language = mb_trim($language);
        $query = mb_trim($query);

        $projectId = 'section-cms';
        $location = 'global'; // or 'us-central1' if you specified a regional endpoint

        $targetLanguage = 'hi'; // e.g., 'zh' for Chinese

        $contents = ['Welcome to SectionCMS'];
        $mimeType = 'text/plain';

        $client = new TranslationServiceClient([
            'credentials' => storage_path('section-cms-51c3812d8334.json'),
        ]);
        $parent = $client->locationName($projectId, $location);

        // Build the request using the TranslateTextRequest object
        $request = (new TranslateTextRequest())
            ->setParent($parent)
            ->setTargetLanguageCode($targetLanguage)
            ->setMimeType($mimeType)
            ->setContents($contents);

        $response = $client->translateText($request);

        // Output the translations
        foreach ($response->getTranslations() as $translation) {
            echo 'Translated text: ' . $translation->getTranslatedText() . PHP_EOL;
        }

        /*try {
            $response = $translationAdapter->translate($language, $query);

            $this->line('Original Query: ' . $query);
            $this->line('Language: ' . $language);
            $this->line('Translated Response: ' . $response['response']);

        } catch (Exception $e) {
            $this->error('Translation failed: ' . $e->getMessage());
        } catch (Throwable $e) {
            $this->error('An unexpected error occurred: ' . $e->getMessage());
        }*/
    }
}

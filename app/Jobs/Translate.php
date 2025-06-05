<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Adapters\TranslationAdapter;
use App\Models\Language;
use App\Models\SectionValue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Log;
use Throwable;

final class Translate implements ShouldQueue
{
    use Queueable;

    public $language;

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly int $sectionValueId)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(TranslationAdapter $translationAdapter): void
    {
        $sectionValue = SectionValue::query()->find($this->sectionValueId);
        $language = Language::query()
            ->where('business_id', $sectionValue->key('business_id'))
            ->where('code', $sectionValue->key('lang'))
            ->first();

        if ($language === null) {
            return;
        }

        try {
            $translation = $translationAdapter->translate(language: $language->key('name'), query: $sectionValue->key('value'));
            $sectionValue->update(['value' => trimString($translation['response'])]);
        } catch (ConnectionException|Throwable $e) {
            // Log the error or handle it as needed
            Log::error('Translation failed', ['error' => $e->getMessage(), 'section_value_id' => $this->sectionValueId, 'language' => $this->language]);

            return;
        }
    }
}

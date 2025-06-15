<?php

declare(strict_types=1);

namespace App\Rules;

use App\Adapters\GoogleTranslationAdapter;
use Closure;
use Google\ApiCore\ApiException;
use Google\ApiCore\ValidationException;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

final class ValidLanguageCode implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! preg_match('/^[a-zA-Z-]+$/', (string) $value)) {
            $fail('The :attribute must only contain letters and hyphens.');

            return;
        }

        try {
            $supportedLangCodes = (new GoogleTranslationAdapter())->getSupportedLanguages();
            if (! in_array($value, $supportedLangCodes, true)) {
                $fail('The :attribute must be a valid language code.');

                return;
            }
        } catch (ApiException|ValidationException) {
            $fail('we can not validate the language code at this time, please try again later.');

            return;
        }
    }
}

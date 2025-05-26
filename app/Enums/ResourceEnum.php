<?php

declare(strict_types=1);

namespace App\Enums;

enum ResourceEnum: string
{
    case WEBSITE = 'website';
    case SECTIONS = 'sections';
    case KEYS = 'keys';
    case MEDIA = 'media';
    case LANGUAGES = 'languages';
    case API_CALLS = 'api_calls';

    public function label(): string
    {
        return match ($this) {
            self::WEBSITE => 'website',
            self::SECTIONS => 'sections',
            self::KEYS => 'keys',
            self::MEDIA => 'media',
            self::LANGUAGES => 'languages',
            self::API_CALLS => 'api_calls',
        };
    }

    public function unit(): string
    {
        return match ($this) {
            self::WEBSITE, self::SECTIONS, self::KEYS, self::LANGUAGES => 'count',
            self::MEDIA => 'MB',
            self::API_CALLS => 'calls per month',
        };
    }

    public function allowed(): int
    {
        return match ($this) {
            self::WEBSITE => 1,
            self::SECTIONS => 20,
            self::KEYS, self::MEDIA => 50,
            self::LANGUAGES => 2,
            self::API_CALLS => 3000,
        };
    }

    public function changes(): float
    {
        // in cents...
        return match ($this) {
            self::WEBSITE => 500,
            self::SECTIONS, self::KEYS, self::LANGUAGES => 100, // per 20 sections // per 50 keys // per additional language
            self::MEDIA => 25, // per 1000 MB
            self::API_CALLS => 0.001, // per calls
        };
    }
}

<?php

declare(strict_types=1);

const CACHE_DURATION = 60;

const COLLECTION_NAME = 'media';

if (! function_exists('extractDomain')) {
    function extractDomain(string $url): string
    {
        return parse_url($url, PHP_URL_HOST);
    }
}

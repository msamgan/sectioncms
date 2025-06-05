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

if (! function_exists('trimString')) {
    function trimString(string $string): string
    {
        $string = preg_replace('/^[\s\W]+|[\s\W]+$/u', '', $string); // Trim leading and trailing special characters
        $string = preg_replace('/[\s\W]+/u', ' ', $string); // Replace multiple spaces with a single space

        return mb_trim($string, '"'); // Trim double quotes from the beginning and end
    }
}

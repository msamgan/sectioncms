<?php

declare(strict_types=1);

return [
    'google' => [
        'project_id' => env('GOOGLE_PROJECT_ID'),
        'location' => env('GOOGLE_LOCATION', 'global'), // or 'us-central1' if you specified a regional endpoint
    ],
    'ollama' => [
        'base_url' => env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'),
        'model' => env('OLLAMA_MODEL', 'llama3:8b'),
    ],
];

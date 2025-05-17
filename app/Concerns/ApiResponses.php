<?php

declare(strict_types=1);

namespace App\Concerns;

trait ApiResponses
{
    public function notFound(string $slug)
    {
        return response()->json([
            'status' => 'not_found',
            'message' => 'Resource not found',
            'error' => 'Resource with id:' . $slug . ' not found',
            'payload' => null,
        ], 404);
    }

    public function ok($payload = null)
    {
        return response()->json([
            'status' => 'ok',
            'message' => 'Request was successful',
            'error' => null,
            'payload' => $payload,
        ], 200);
    }

    public function error(?string $message = null, int $code = 500)
    {
        if (! $message) {
            $message = 'An error occurred while processing your request';
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Request failed',
            'error' => $message,
            'payload' => null,
        ], $code);
    }
}

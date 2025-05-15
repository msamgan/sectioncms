<?php

declare(strict_types=1);

namespace App\Actions\Medium;

use Illuminate\Support\Facades\Auth;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

final class CreateMedium
{
    /**
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function handle(): void
    {
        Auth::user()->addMediaFromRequest('file')->toMediaCollection(COLLECTION_NAME);
    }
}

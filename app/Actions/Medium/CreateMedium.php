<?php

declare(strict_types=1);

namespace App\Actions\Medium;

use Illuminate\Support\Facades\Auth;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

final class CreateMedium
{
    /**
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function handle(): Media
    {
        return Auth::user()->addMediaFromRequest('file')
            ->withCustomProperties(['businessId' => Auth::user()->key('business_id')])
            ->toMediaCollection(COLLECTION_NAME);
    }
}

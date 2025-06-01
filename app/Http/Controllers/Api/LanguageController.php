<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Stores\LanguageStore;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;

final class LanguageController extends Controller
{
    /**
     * Active Languages
     *
     * @return mixed
     *
     * @throws ConnectionException
     * @throws FileNotFoundException
     */
    public function index(Request $request)
    {
        return response()->ok(payload: LanguageStore::activeLanguages(businessId: $request->get('business')->getKey())->map(
            fn ($language): array => [
                'name' => $language->name,
                'code' => $language->code,
            ]
        ));
    }
}

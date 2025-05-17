<?php

declare(strict_types=1);

namespace App\Actions\Language;

use App\Models\Language;
use App\Utils\Caseify;
use Illuminate\Support\Str;

final class CreateLanguage
{
    public function handle(array $data): Language
    {
        $data['name'] = Caseify::handle($data['name'])['titleCase'];
        $data['code'] = Str::lower($data['code']);

        return Language::query()->create($data);
    }
}

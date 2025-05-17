<?php

declare(strict_types=1);

namespace App\Actions\Language;

use App\Models\Language;
use App\Utils\Caseify;
use Illuminate\Support\Str;

final class UpdateLanguage
{
    public function handle(Language $language, array $data): Language
    {
        $data['name'] = Caseify::handle($data['name'])['titleCase'];
        $data['code'] = Str::lower($data['code']);

        $language->update($data);

        return $language->refresh();
    }
}

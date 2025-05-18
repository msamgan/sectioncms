<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Models\Section;
use Illuminate\Support\Str;

final class CreateSection
{
    public function handle(array $data): Section
    {
        $data['name'] = Str::title(mb_trim($data['name']));

        // business_id, created_by, updated_by are set in the model's boot method
        // so we don't need to set them here
        return Section::query()->create($data);
    }
}

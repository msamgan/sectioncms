<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Models\Section;

final class CreateSection
{
    public function handle(array $data): Section
    {
        // business_id, created_by, updated_by are set in the model's boot method
        // so we don't need to set them here
        return Section::query()->create($data);
    }
}

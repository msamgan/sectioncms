<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Models\Section;

final class CreateSection
{
    public function handle(array $data): Section
    {
        return Section::query()->create($data);
    }
}

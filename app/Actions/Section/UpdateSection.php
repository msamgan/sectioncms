<?php

declare(strict_types=1);

namespace App\Actions\Section;

use App\Models\Section;

final class UpdateSection
{
    public function handle(Section $section, array $data): Section
    {
        $section->update($data);

        return $section;
    }
}

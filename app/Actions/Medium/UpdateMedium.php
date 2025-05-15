<?php

declare(strict_types=1);

namespace App\Actions\Medium;

use App\Models\Medium;

final class UpdateMedium
{
    public function handle(Medium $medium, array $data): Medium
    {
        $medium->update($data);

        return $medium;
    }
}

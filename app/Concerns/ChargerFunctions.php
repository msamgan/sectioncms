<?php

declare(strict_types=1);

namespace App\Concerns;

trait ChargerFunctions
{
    private function calculateDaysMultiplier(): float
    {
        return round(ceil(now()->startOfDay()->diffInDays(now()->endOfMonth())) / now()->daysInMonth, 2);
    }
}

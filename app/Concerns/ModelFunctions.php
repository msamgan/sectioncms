<?php

declare(strict_types=1);

namespace App\Concerns;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

trait ModelFunctions
{
    use LogsActivity;

    public function saveKey(string $key, mixed $value): void
    {
        $this->$key = $value;
        $this->save();
    }

    public function key(string $key): mixed
    {
        return $this->$key;
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnlyDirty()
            ->logFillable();
    }
}

<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ApiDailyUsage extends Model
{
    use ModelFunctions;

    protected $fillable = [
        'business_id',
        'count',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }
}

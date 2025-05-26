<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ResourceTracking extends Model
{
    protected $table = 'resource_tracking';

    protected $fillable = [
        'user_id',
        'type',
        'unit',
        'allowed',
        'used',
        'changeable',
        'charges',
        'charge_on',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'allowed' => 'integer',
            'used' => 'integer',
            'remaining' => 'integer',
        ];
    }
}

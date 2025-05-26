<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ResourceTracking extends Model
{
    use ModelFunctions;

    public $timestamps = false;

    protected $table = 'resource_tracking';

    protected $fillable = [
        'business_id',
        'type',
        'unit',
        'allowed',
        'charges',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id', 'id');
    }

    protected function casts(): array
    {
        return [
            'allowed' => 'integer',
        ];
    }
}

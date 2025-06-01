<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class UserCard extends Model
{
    use ModelFunctions;

    protected $fillable = [
        'user_id',
        'business_id',
        'stripe_payment_method_id',
        'metadata',
    ];

    /**
     * Get the user that owns the card.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'is_default' => 'boolean',
        ];
    }
}

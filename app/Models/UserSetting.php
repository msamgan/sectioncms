<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Override;

final class UserSetting extends Model
{
    use ModelFunctions;

    protected $fillable = [
        'user_id',
        'setting_id',
        'value',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function setting(): BelongsTo
    {
        return $this->belongsTo(Setting::class);
    }

    #[Override]
    protected static function boot(): void
    {
        parent::boot();

        self::creating(function ($model): void {
            $model->user_id = auth()->id();
        });
    }

    protected function casts(): array
    {
        return [
            'value' => 'string',
        ];
    }
}

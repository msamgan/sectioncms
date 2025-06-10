<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Database\Factories\LanguageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Override;

final class Language extends Model
{
    /** @use HasFactory<LanguageFactory> */
    use HasFactory;

    use ModelFunctions;

    protected $fillable = [
        'business_id',
        'name',
        'code',
        'created_by',
        'updated_by',
        'is_active',
        'is_default',
    ];

    protected $hidden = [
        'business_id',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    #[Override]
    protected static function boot(): void
    {
        parent::boot();

        self::creating(function ($model): void {
            $model->business_id = auth()->user()->key('business_id');
            $model->created_by = auth()->id();
            $model->updated_by = auth()->id();
        });

        self::updating(function ($model): void {
            $model->updated_by = auth()->id();
        });
    }

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}

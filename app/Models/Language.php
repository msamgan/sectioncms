<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Database\Factories\LanguageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
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
            $model->business_id = Auth::user()->key('business_id');
            $model->created_by = Auth::user()->getKey();
            $model->updated_by = Auth::user()->getKey();
        });

        self::updating(function ($model): void {
            $model->updated_by = Auth::user()->getKey();
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

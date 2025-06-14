<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Override;

final class SectionValue extends Model
{
    use ModelFunctions;

    protected $fillable = [
        'lang',
        'value',
        'section_key_id',
    ];

    protected $hidden = [
        'business_id',
        'created_at',
        'updated_at',
    ];

    #[Override]
    protected static function boot(): void
    {
        parent::boot();

        self::creating(function ($model): void {
            $model->business_id = auth()->businessId();
        });
    }
}

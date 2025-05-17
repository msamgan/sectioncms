<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Override;

final class SectionKey extends Model
{
    use ModelFunctions;

    protected $fillable = [
        'key',
        'section_id',
    ];

    protected $hidden = [
        'business_id',
        'created_at',
        'updated_at',
    ];

    public function values()
    {
        return $this->hasMany(SectionValue::class, 'section_key_id', 'id');
    }

    #[Override]
    protected static function boot(): void
    {
        parent::boot();

        self::creating(function ($model): void {
            $model->business_id = auth()->user()->key('business_id');
        });
    }
}

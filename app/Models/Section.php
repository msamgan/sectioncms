<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Database\Factories\SectionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Override;

/**
 * @property int $id
 * @property $keys
 */
final class Section extends Model
{
    /** @use HasFactory<SectionFactory> */
    use HasFactory;

    use ModelFunctions;

    protected $hidden = [
        'created_by',
        'updated_by',
        'business_id',
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'name',
        'business_id',
        'created_by',
        'updated_by',
    ];

    public function keys()
    {
        return $this->hasMany(SectionKey::class, 'section_id', 'id');
    }

    #[Override]
    protected static function boot(): void
    {
        parent::boot();

        self::creating(function ($model): void {
            $model->business_id = Auth::user()->key('business_id');
            $model->created_by = Auth::user()->getKey();
            $model->updated_by = Auth::user()->getKey();
            $model->slug = $model->slugify($model->name);
        });

        self::updating(function ($model): void {
            $model->updated_by = Auth::user()->getKey();
            $model->slug = $model->slugify($model->name);
        });
    }

    private function slugify(string $value): string
    {
        return Str::slug($value, '-');
    }
}

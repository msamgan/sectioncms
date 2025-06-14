<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;
use Override;

final class Setting extends Model
{
    use ModelFunctions;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'group',
        'default',
        'options',
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];

    /**
     * Get the route key for the model.
     */
    #[Override]
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected function casts(): array
    {
        return [
            'options' => 'array',
        ];
    }
}

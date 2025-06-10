<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Illuminate\Database\Eloquent\Model;

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

    public function userSettings()
    {
        return $this->hasMany(UserSetting::class);
    }

    protected function casts(): array
    {
        return [
            'options' => 'array',
        ];
    }
}

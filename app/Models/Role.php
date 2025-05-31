<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Override;

/**
 * @method static find(mixed $get)
 */
final class Role extends \Spatie\Permission\Models\Role
{
    use HasFactory;
    use ModelFunctions;

    protected $fillable = ['name', 'display_name', 'guard_name', 'business_id', 'created_by', 'updated_by'];

    protected $hidden = [
        'guard_name',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        'business_id',
    ];

    public static function business(): self
    {
        return self::query()->find(RoleEnum::Business->id());
    }

    public static function superAdmin(): self
    {
        return self::query()->find(RoleEnum::SuperAdmin->id());
    }

    #[Override]
    protected static function boot(): void
    {
        parent::boot();

        self::creating(function (self $role): void {
            $role->business_id = auth()->businessId();
            $role->created_by = auth()->id();
            $role->updated_by = auth()->id();
            $role->guard_name = 'web';
        });

        self::updating(function (self $role): void {
            $role->updated_by = auth()->id();
        });
    }
}

<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;

final class RoleStore
{
    public static function roles(int $businessId, ?string $q): Collection
    {
        return self::roleBaseQuery(businessId: $businessId, q: $q)->get();
    }

    public static function roleCount(int $businessId): int
    {
        return Role::query()
            ->where('business_id', $businessId)
            ->select('id')->count();
    }

    public static function role(int $roleId): ?Role
    {
        return Role::query()->find($roleId);
    }

    public static function activeRoles(int $businessId, ?string $q): Collection
    {
        return self::roleBaseQuery(businessId: $businessId, q: $q)
            ->where('is_active', true)
            ->get();
    }

    private static function roleBaseQuery(int $businessId, ?string $q)
    {
        return Role::query()->where('business_id', $businessId)
            ->select('name', 'display_name', 'id', 'is_active')
            ->withCount('users')
            ->when($q, function ($query) use ($q): void {
                $query->where('display_name', 'like', "%{$q}%");
            });
    }
}

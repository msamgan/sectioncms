<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Role;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\ConnectionException;

final class RoleStore
{
    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    public static function roles(int $businessId, ?string $q): Collection
    {
        return Role::query()->where('business_id', $businessId)
            ->select('name', 'display_name', 'id', 'is_active')
            ->withCount('users')
            ->when($q, function ($query) use ($q): void {
                $query->where('display_name', 'like', "%{$q}%");
            })->get();
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

    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    public static function activeRoles(int $businessId, ?string $q)
    {
        return Role::query()->where('business_id', $businessId)
            ->select('name', 'display_name', 'id', 'is_active')
            ->where('is_active', true)
            ->withCount('users')
            ->when($q, function ($query) use ($q): void {
                $query->where('display_name', 'like', "%{$q}%");
            })->get();
    }
}

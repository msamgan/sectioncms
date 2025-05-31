<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Role;

final class RoleStore
{
    public static function role(int $roleId): ?Role
    {
        return Role::query()->find($roleId);
    }
}

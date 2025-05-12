<?php

declare(strict_types=1);

use App\Actions\Permission\AssignPermissionToRole;
use App\Actions\Permission\CreatePermission;
use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

return new class extends Migration
{
    use App\Concerns\PermissionFunctions;

    public function up(): void
    {
        Role::create([
            'display_name' => RoleEnum::SuperAdmin->value,
            'name' => Str::uuid()->toString(),
        ]);

        foreach ($this->permissionList() as $permission) {
            (new CreatePermission)->handle(
                permission: $permission,
                module: RoleEnum::Business->label()
            );
        }

        $businessRole = Role::create([
            'display_name' => RoleEnum::Business->value,
            'name' => Str::uuid()->toString(),
        ]);

        (new AssignPermissionToRole)->handle(
            role: $businessRole,
            permission: 'update',
            module: RoleEnum::Business->label()
        );

        Role::create([
            'display_name' => RoleEnum::Customer->value,
            'name' => Str::uuid()->toString(),
        ]);
    }

    public function down(): void
    {
        //
    }
};

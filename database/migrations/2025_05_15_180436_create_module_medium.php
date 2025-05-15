<?php

declare(strict_types=1);

use App\Actions\Menu\CreateMenu;
use App\Actions\Permission\AssignPermissionToRole;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use App\Concerns\PermissionFunctions;

    public function up(): void
    {
        $moduleName = 'Medium';
        $menuLabel = 'Media';
        $menuIcon = 'ri-image-line';
        $parentId = '';
        $haveNewParent = 'no';

        if ($haveNewParent === 'yes') {
            $parentId = ((new CreateMenu)->handle(
                label: 'NA',
                route: '#',
                icon: 'NA',
                permission: null,
            ))->getKey();
        }

        $case = App\Utils\Caseify::handle($moduleName);

        $underscoreCase = $case['underscoreCase'];

        $businessRole = Role::business();

        foreach ($this->permissionList() as $permission) {
            (new AssignPermissionToRole)->handle(
                role: $businessRole,
                permission: $permission,
                module: $underscoreCase,
            );
        }

        (new CreateMenu)->handle(
            label: $menuLabel,
            route: $underscoreCase . '.index',
            icon: $menuIcon,
            permission: $underscoreCase . '.list',
            parent: $parentId === '' ? null : $parentId,
        );
    }

    public function down(): void
    {
        //
    }
};

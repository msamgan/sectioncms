<?php

declare(strict_types=1);

use App\Actions\Permission\AssignPermissionToRole;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use App\Concerns\PermissionFunctions;

    public function up(): void
    {
        $moduleName = 'PaymentMethod';

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
    }

    public function down(): void
    {
        //
    }
};

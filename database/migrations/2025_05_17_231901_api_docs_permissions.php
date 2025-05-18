<?php

declare(strict_types=1);

use App\Actions\Permission\AssignPermissionToRole;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $moduleName = 'ApiDocs';
        $case = App\Utils\Caseify::handle($moduleName);

        $underscoreCase = $case['underscoreCase'];

        $businessRole = Role::business();

        (new AssignPermissionToRole)->handle(
            role: $businessRole,
            permission: 'view',
            module: $underscoreCase,
        );
    }

    public function down(): void
    {
        //
    }
};

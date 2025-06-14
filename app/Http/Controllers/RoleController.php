<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Notification\NotifyUser;
use App\Actions\Role\CreateRole;
use App\Actions\Role\UpdateRole;
use App\Http\Requests\DeleteRoleRequest;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Role;
use App\Notifications\RoleCreated;
use App\Notifications\RoleDeleted;
use App\Notifications\RoleUpdated;
use App\Stores\RoleStore;
use App\Utils\Access;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Throwable;

final class RoleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Role/Index');
    }

    /**
     * @throws Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:role.create'])]
    public function store(StoreRoleRequest $request, CreateRole $createRole, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();
        try {
            $role = $createRole->handle(name: $request->get('name'));
            $role->syncPermissions($request->get('permissions'));

            $notifyUser->handle(new RoleCreated($role, auth()->user()));

            DB::commit();
        } catch (Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    #[Action(params: ['role'], middleware: ['auth', 'check_has_business', 'can:role.view'])]
    public function show(Role $role): Role
    {
        Access::businessCheck(businessId: $role->key('business_id'));

        return $role->load('permissions');
    }

    /**
     * @throws Throwable
     */
    #[Action(method: 'post', params: ['role'], middleware: ['auth', 'check_has_business', 'can:role.update'])]
    public function update(UpdateRoleRequest $request, Role $role, UpdateRole $updateRole, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();
        try {
            $role = $updateRole->handle(role: $role, name: $request->get('name'));
            $role->syncPermissions($request->get('permissions'));

            $notifyUser->handle(new RoleUpdated($role));

            DB::commit();
        } catch (Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    #[Action(method: 'delete', params: ['role'], middleware: ['auth', 'check_has_business', 'can:role.delete'])]
    public function destroy(DeleteRoleRequest $request, Role $role, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new RoleDeleted($role));

        $role->delete();
    }

    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    #[Action(middleware: ['auth', 'check_has_business', 'can:role.list'])]
    public function roles(Request $request): Collection
    {
        if ($request->get('active')) {
            return RoleStore::activeRoles(businessId: auth()->businessId(), q: $request->get('q'));
        }

        return RoleStore::roles(businessId: auth()->businessId(), q: $request->get('q'));
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:role.list'])]
    public function roleCount(): int
    {
        return RoleStore::roleCount(businessId: auth()->businessId());
    }

    #[Action(method: 'post', params: ['role'], middleware: ['auth', 'check_has_business', 'can:role.update'])]
    public function toggleIsActive(Request $request, Role $role, NotifyUser $notifyUser): void
    {
        $role->toggleIsActive();

        $notifyUser->handle(new RoleUpdated($role));
    }
}

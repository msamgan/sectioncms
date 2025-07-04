<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Notification\NotifyUser;
use App\Actions\Role\AssignRole;
use App\Actions\Setting\CreateSetting;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Notifications\UserCreated;
use App\Notifications\UserDeleted;
use App\Notifications\UserUpdated;
use App\Stores\RoleStore;
use App\Stores\UserStore;
use App\Utils\Access;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Throwable;

final class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('User/Index');
    }

    /**
     * @throws Exception
     * @throws Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:user.create'])]
    public function store(StoreUserRequest $request, AssignRole $assignRole, CreateSetting $createSettingAction, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();

        try {
            $user = User::query()->create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
            ]);

            $role = RoleStore::role(roleId: (int) $request->get('role'));

            $assignRole->handle(user: $user, role: $role, makeRoleActive: true);

            $notifyUser->handle(new UserCreated($user, $role, auth()->user()));

            $createSettingAction->handle(userId: $user->getKey());

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(params: ['user'], middleware: ['auth', 'check_has_business', 'can:user.view'])]
    public function show(User $user): User
    {
        Access::businessCheck(businessId: $user->key('business_id'));

        return $user->load('role');
    }

    #[Action(method: 'post', params: ['user'], middleware: ['auth', 'check_has_business', 'can:user.update'])]
    public function update(UpdateUserRequest $request, User $user, AssignRole $assignRole, NotifyUser $notifyUser): void
    {
        if ($request->get('password')) {
            $request->merge(['password' => bcrypt($request->get('password'))]);
        }

        $role = RoleStore::role(roleId: (int) $request->get('role'));

        $assignRole->handle(user: $user, role: $role, makeRoleActive: true);

        $filteredData = array_filter(
            array_diff_key($request->validated(), ['role' => '']),
            fn ($value): bool => ! is_null($value)
        );

        $user->update($filteredData);

        $notifyUser->handle(new UserUpdated($user, auth()->user()));
    }

    #[Action(method: 'delete', params: ['user'], middleware: ['auth', 'check_has_business', 'can:user.delete'])]
    public function destroy(DeleteUserRequest $request, User $user, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new UserDeleted($user, auth()->user()));

        $user->delete();
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:user.list'])]
    public function users(Request $request): Collection
    {
        return UserStore::users(businessId: auth()->businessId(), q: $request->get('q'));
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:user.list'])]
    public function userCount(): int
    {
        return UserStore::userCount(businessId: auth()->businessId());
    }

    #[Action(method: 'post', params: ['user'], middleware: ['auth', 'check_has_business', 'can:user.update'])]
    public function toggleIsActive(Request $request, User $user, NotifyUser $notifyUser): void
    {
        $user->toggleIsActive();

        $notifyUser->handle(new UserUpdated($user, auth()->user()));
    }
}

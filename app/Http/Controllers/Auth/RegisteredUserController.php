<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Business\CreateAllowedResources;
use App\Actions\Business\CreateBusiness;
use App\Actions\Language\CreateLanguage;
use App\Actions\Role\AssignRole;
use App\Actions\Setting\CreateSetting;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\UnauthorizedEmailProviders;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws Exception|Throwable
     */
    public function store(
        Request $request,
        AssignRole $assignRoleAction,
        CreateBusiness $createBusinessAction,
        CreateLanguage $createLanguageAction,
        CreateAllowedResources $createAllowedResourcesAction,
        CreateSetting $createSettingAction
    ) {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users', new UnauthorizedEmailProviders()],
            'password' => ['required', 'confirmed', $this->getPasswordDefaults()],
            'website' => ['required', 'string', 'url', 'max:255'],
        ]);

        DB::beginTransaction();

        try {
            $user = User::query()->create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);

            Auth::login($user);

            $assignRoleAction->handle(user: $user, role: RoleEnum::Business->role(), makeRoleActive: true);
            $createBusinessAction->handle(user: $user, businessName: extractDomain(url: $request->get('website')), makeBusinessActive: true);
            $createLanguageAction->handle(['name' => 'English', 'code' => 'en'], isDefault: true);
            $createAllowedResourcesAction->handle();
            $createSettingAction->handle();

            DB::commit();

            event(new Registered($user));

            return redirect(route('dashboard', absolute: false));

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    private function getPasswordDefaults(): ?Password
    {
        return Password::defaults();
    }
}

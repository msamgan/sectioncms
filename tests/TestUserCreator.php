<?php

declare(strict_types=1);

namespace Tests;

use App\Actions\Business\CreateBusiness;
use App\Actions\Language\CreateLanguage;
use App\Actions\Role\AssignRole;
use App\Models\Role;
use App\Models\User;
use Random\RandomException;

final readonly class TestUserCreator
{
    /**
     * @throws RandomException
     */
    public static function create(mixed $test): array
    {
        $user = User::factory()->create();
        $assignRoleAction = new AssignRole();
        $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
        $createBusinessAction = new CreateBusiness();
        $business = $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

        $test->actingAs($user);

        $createLanguageAction = new CreateLanguage();
        $en = $createLanguageAction->handle(['name' => 'English', 'code' => 'en']);
        $es = $createLanguageAction->handle(['name' => 'Spanish', 'code' => 'es']);

        return [
            'user' => $user,
            'business' => $business,
            'languages' => [
                'en' => $en,
                'es' => $es,
            ],
        ];
    }
}

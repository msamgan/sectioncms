<?php

declare(strict_types=1);

use App\Actions\Business\CreateBusiness;
use App\Actions\Role\AssignRole;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('password can be updated', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    $this->assertTrue(Hash::check('new-password', $user->refresh()->password));
});

test('correct password must be provided to update password', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    $response
        ->assertSessionHasErrors('current_password')
        ->assertRedirect('/profile');
});

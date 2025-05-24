<?php

declare(strict_types=1);

use App\Models\User;

test('login screen can be rendered', function (): void {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function (): void {
    $user = User::factory()->create();

    $assignRoleAction = new App\Actions\Role\AssignRole();

    $assignRoleAction->handle(user: $user, role: App\Models\Role::business(), makeRoleActive: true);

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();

    $response->assertRedirect(route('dashboard', absolute: false));
});

test('users can not authenticate with invalid password', function (): void {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

/**
 * @throws Random\RandomException
 */
test('users can logout', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new App\Actions\Role\AssignRole();
    $assignRoleAction->handle(user: $user, role: App\Models\Role::business(), makeRoleActive: true);
    $createBusinessAction = new App\Actions\Business\CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();

    $response->assertRedirect('/');
});

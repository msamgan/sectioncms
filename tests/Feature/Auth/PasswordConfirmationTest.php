<?php

declare(strict_types=1);

use App\Actions\Business\CreateBusiness;
use App\Actions\Role\AssignRole;
use App\Models\Role;
use App\Models\User;

test('confirm password screen can be rendered', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this->actingAs($user)->get('/confirm-password');

    $response->assertStatus(200);
});

test('password can be confirmed', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this->actingAs($user)->post('/confirm-password', [
        'password' => 'password',
    ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
});

test('password is not confirmed with invalid password', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this->actingAs($user)->post('/confirm-password', [
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors();
});

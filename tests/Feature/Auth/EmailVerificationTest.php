<?php

declare(strict_types=1);

use App\Actions\Business\CreateBusiness;
use App\Actions\Role\AssignRole;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;

test('email verification screen can be rendered', function (): void {
    $user = User::factory()->unverified()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $response = $this->actingAs($user)->get('/verify-email');

    $response->assertStatus(200);
});

test('email can be verified', function (): void {
    $user = User::factory()->unverified()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    Event::fake();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1((string) $user->email)]
    );

    $response = $this->actingAs($user)->get($verificationUrl);

    Event::assertDispatched(Verified::class);
    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    $response->assertRedirect(route('dashboard', absolute: false) . '?verified=1');
});

test('email is not verified with invalid hash', function (): void {
    $user = User::factory()->unverified()->create();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1('wrong-email')]
    );

    $this->actingAs($user)->get($verificationUrl);

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

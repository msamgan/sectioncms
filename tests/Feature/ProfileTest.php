<?php

declare(strict_types=1);

use Random\RandomException;
use Tests\TestUserCreator;

test('profile page is displayed', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $user = $userData['user'];
        $response = $this
            ->actingAs($user)
            ->get('settings');

        $response->assertOk();
    } catch (RandomException $e) {
        $this->fail('Failed to create test user: ' . $e->getMessage());
    }

});

test('profile information can be updated', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $user = $userData['user'];

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertOk();

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);

    } catch (RandomException $e) {
        $this->fail('Failed to create test user: ' . $e->getMessage());
    }

});

test('email verification status is unchanged when the email address is unchanged', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $user = $userData['user'];

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertOk();

        $this->assertNotNull($user->refresh()->email_verified_at);
    } catch (RandomException $e) {
        $this->fail('Failed to create test user: ' . $e->getMessage());
    }
});

test('user can delete their account', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $user = $userData['user'];

        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    } catch (RandomException $e) {
        $this->fail('Failed to create test user: ' . $e->getMessage());
    } catch (JsonException $e) {
        $this->fail('JSON error occurred: ' . $e->getMessage());
    }
});

test('correct password must be provided to delete account', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $user = $userData['user'];

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        $this->assertNotNull($user->fresh());
    } catch (RandomException) {

    }

});

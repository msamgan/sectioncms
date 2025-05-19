<?php

declare(strict_types=1);

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

test('can create a role using factory', function () {
    $role = Role::factory()->create([
        'display_name' => 'Test Role',
        'business_id' => null,
        'created_by' => null,
    ]);

    expect($role)->toBeInstanceOf(Role::class)
        ->and($role->display_name)->toBe('Test Role');
});

test(/**
 * @throws ReflectionException
 */ 'business method returns the business role', function () {
    // Call the business method
    $result = Role::business();

    // Assert that the result is the business role
    expect($result)->toBeInstanceOf(Role::class)
        ->and($result->id)->toBe(RoleEnum::Business->id())
        ->and($result->display_name)->toBe(RoleEnum::Business->value);
});

test('superAdmin method returns the super admin role', function () {
    // Call the superAdmin method
    $result = Role::superAdmin();

    // Assert that the result is the super admin role
    expect($result)->toBeInstanceOf(Role::class)
        ->and($result->id)->toBe(RoleEnum::SuperAdmin->id())
        ->and($result->display_name)->toBe(RoleEnum::SuperAdmin->value);
});

test('saveKey method saves a specific attribute', function () {
    $role = Role::factory()->create([
        'display_name' => 'Original Name',
    ]);

    $role->saveKey('display_name', 'Updated Name');

    expect($role->fresh()->display_name)->toBe('Updated Name');
});

test('key method retrieves a specific attribute', function () {
    $role = Role::factory()->create([
        'display_name' => 'Test Role',
    ]);

    $displayName = $role->key('display_name');

    expect($displayName)->toBe('Test Role');
});

test('role enum can retrieve corresponding role model', function () {
    // Create roles for each enum case

    // Test each enum case
    $resultSuperAdmin = RoleEnum::SuperAdmin->role();
    $resultBusiness = RoleEnum::Business->role();
    $resultCustomer = RoleEnum::Customer->role();

    // Assert that the results are the correct roles
    expect($resultSuperAdmin)->toBeInstanceOf(Role::class)
        ->and($resultSuperAdmin->display_name)->toBe(RoleEnum::SuperAdmin->value)
        ->and($resultBusiness)->toBeInstanceOf(Role::class)
        ->and($resultBusiness->display_name)->toBe(RoleEnum::Business->value)
        ->and($resultCustomer)->toBeInstanceOf(Role::class)
        ->and($resultCustomer->display_name)->toBe(RoleEnum::Customer->value);
});

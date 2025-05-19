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

test('business method returns the business role', function () {
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

test('fillable attributes are correctly defined', function () {
    $role = new Role();
    $fillable = $role->getFillable();

    expect($fillable)->toBeArray()
        ->toContain('name')
        ->toContain('display_name')
        ->toContain('guard_name')
        ->toContain('business_id')
        ->toContain('created_by')
        ->toHaveCount(5);
});

test('hidden attributes are correctly defined', function () {
    $role = new Role();
    $hidden = $role->getHidden();

    expect($hidden)->toBeArray()
        ->toContain('guard_name')
        ->toContain('created_at')
        ->toContain('updated_at')
        ->toContain('created_by')
        ->toHaveCount(4);
});

test('role inherits from spatie permission role', function () {
    $role = new Role();

    expect($role)->toBeInstanceOf(Spatie\Permission\Models\Role::class);
});

test('getActivitylogOptions returns correct configuration', function () {
    $role = new Role();
    $options = $role->getActivitylogOptions();

    expect($options)->toBeInstanceOf(Spatie\Activitylog\LogOptions::class);

    // Test that the options are configured correctly
    $reflection = new ReflectionClass($options);
    $logOnlyDirty = $reflection->getProperty('logOnlyDirty');
    $logOnlyDirty->setAccessible(true);

    expect($logOnlyDirty->getValue($options))->toBeTrue();
});

test('roleEnum label method returns correct values', function () {
    expect(RoleEnum::SuperAdmin->label())->toBe('super_admin')
        ->and(RoleEnum::Business->label())->toBe('business')
        ->and(RoleEnum::Customer->label())->toBe('customer');
});

test('roleEnum id method returns correct values', function () {
    expect(RoleEnum::SuperAdmin->id())->toBe(1)
        ->and(RoleEnum::Business->id())->toBe(2)
        ->and(RoleEnum::Customer->id())->toBe(3);
});

test('business method throws exception when role does not exist', function () {
    // Delete the business role if it exists
    DB::table('roles')->where('id', RoleEnum::Business->id())->delete();

    // Expect an exception when calling the business method
    expect(fn () => Role::business())->toThrow(TypeError::class);
});

test('superAdmin method throws exception when role does not exist', function () {
    // Delete the super admin role if it exists
    DB::table('roles')->where('id', RoleEnum::SuperAdmin->id())->delete();

    // Expect an exception when calling the superAdmin method
    expect(fn () => Role::superAdmin())->toThrow(TypeError::class);
});

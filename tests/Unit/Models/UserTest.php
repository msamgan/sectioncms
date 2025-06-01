<?php

declare(strict_types=1);

use App\Actions\Business\CreateBusiness;
use App\Actions\Role\AssignRole;
use App\Concerns\ModelFunctions;
use App\Enums\RoleEnum;
use App\Models\Business;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use Tests\TestCase;
use Tests\TestUserCreator;

uses(TestCase::class, RefreshDatabase::class);

// Clean up Mockery expectations after each test
afterEach(function (): void {
    Mockery::close();
});

test('can create a user using factory', function (): void {
    $user = User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    expect($user)->toBeInstanceOf(User::class)
        ->and($user->name)->toBe('Test User')
        ->and($user->email)->toBe('test@example.com');
});

test('fillable attributes are correctly defined', function (): void {
    $user = new User();
    $fillable = $user->getFillable();

    expect($fillable)->toBeArray()
        ->toContain('name')
        ->toContain('email')
        ->toContain('password')
        ->toContain('role_id')
        ->toContain('business_id')
        ->toContain('email_verified_at')
        ->toContain('created_by')
        ->toContain('updated_by')
        ->toContain('is_active')
        ->toHaveCount(9);
});

test('hidden attributes are correctly defined', function (): void {
    $user = new User();
    $hidden = $user->getHidden();

    expect($hidden)->toBeArray()
        ->toContain('password')
        ->toContain('remember_token')
        ->toContain('email_verified_at')
        ->toContain('created_by')
        ->toContain('updated_by')
        ->toHaveCount(5);
});

test('casts are correctly defined', function (): void {
    $user = new User();
    $casts = $user->getCasts();

    expect($casts)->toBeArray()
        ->toHaveKey('email_verified_at')
        ->toHaveKey('password');

    expect($casts['email_verified_at'])->toBe('datetime');
    expect($casts['password'])->toBe('hashed');
});

test('businesses relationship returns businesses owned by user', function (): void {
    $user = User::factory()->create();
    $business = Business::factory()->create(['user_id' => $user->id]);

    expect($user->businesses)->toBeInstanceOf(Collection::class)
        ->and($user->businesses->first())->toBeInstanceOf(Business::class)
        ->and($user->businesses->first()->id)->toBe($business->id);
});

test('business relationship returns business user belongs to', function (): void {
    $user = User::factory()->create();
    $assignRoleAction = new AssignRole();
    $assignRoleAction->handle(user: $user, role: App\Models\Role::business(), makeRoleActive: true);
    $createBusinessAction = new CreateBusiness();
    $business = $createBusinessAction->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    expect($user->business)->toBeInstanceOf(Business::class)
        ->and($user->business->id)->toBe($business->id);
});

test('role relationship returns user role', function (): void {
    $role = Role::findById(RoleEnum::Business->id());
    $user = User::factory()->create(['role_id' => $role->id]);

    expect($user->role)->toBeInstanceOf(Role::class)
        ->and($user->role->id)->toBe($role->id);
});

test('hasBusiness returns true when user has business_id', function (): void {
    $user = User::factory()->create();
    (new AssignRole())->handle(user: $user, role: App\Models\Role::business(), makeRoleActive: true);
    (new CreateBusiness())->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    expect($user->hasBusiness())->toBeTrue();
});

test('hasBusiness returns false when user has no business_id', function (): void {
    $user = User::factory()->create(['business_id' => null]);

    expect($user->hasBusiness())->toBeFalse();
});

test('isBusiness returns true when user has business role', function (): void {
    $role = Role::findById(RoleEnum::Business->id());
    $user = User::factory()->create(['role_id' => $role->id]);
    $user->assignRole($role);

    expect($user->isBusiness())->toBeTrue();
});

test('isBusiness returns false when user does not have business role', function (): void {
    $role = Role::findById(RoleEnum::Customer->id());
    $user = User::factory()->create(['role_id' => $role->id]);
    $user->assignRole($role);

    expect($user->isBusiness())->toBeFalse();
});

test('getAccessAttribute returns user permissions', function (): void {
    $user = User::factory()->create();
    $role = Role::findById(RoleEnum::Business->id());
    $user->assignRole($role);

    expect($user->access)->toBeInstanceOf(Collection::class);
    // Further assertions would depend on the specific permissions assigned to the role
});

test('businessId returns authenticated user business_id', function (): void {
    try {
        $userData = TestUserCreator::create($this);
        $user = $userData['user'];
        $business = $userData['business'];

        expect($user->businessId())->toBe($business->id)
            ->and(auth()->businessId())->toBe($business->id);
    } catch (Random\RandomException $e) {
        $this->fail('Failed to create test user: ' . $e->getMessage());
    }
});

test('registerMediaConversions sets up media conversions', function (): void {
    $user = new User();
    $reflection = new ReflectionClass($user);
    $method = $reflection->getMethod('registerMediaConversions');

    // This is a bit tricky to test directly, so we're just ensuring the method exists and is callable
    expect($method)->toBeInstanceOf(ReflectionMethod::class)
        ->and($method->isPublic())->toBeTrue();
});

test('user implements HasMedia interface', function (): void {
    $user = new User();

    expect($user)->toBeInstanceOf(HasMedia::class);
});

test('user implements MustVerifyEmail interface', function (): void {
    $user = new User();

    expect($user)->toBeInstanceOf(MustVerifyEmail::class);
});

test('user uses HasFactory trait', function (): void {
    $traits = class_uses(User::class);

    expect($traits)->toHaveKey(HasFactory::class);
});

test('user uses Notifiable trait', function (): void {
    $traits = class_uses(User::class);

    expect($traits)->toHaveKey(Notifiable::class);
});

test('user uses HasRoles trait', function (): void {
    $traits = class_uses(User::class);

    expect($traits)->toHaveKey(HasRoles::class);
});

test('user uses InteractsWithMedia trait', function (): void {
    $traits = class_uses(User::class);

    expect($traits)->toHaveKey(InteractsWithMedia::class);
});

test('user uses CausesActivity trait', function (): void {
    $traits = class_uses(User::class);

    expect($traits)->toHaveKey(CausesActivity::class);
});

test('user uses ModelFunctions trait', function (): void {
    $traits = class_uses(User::class);

    expect($traits)->toHaveKey(ModelFunctions::class);
});

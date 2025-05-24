<?php

declare(strict_types=1);

use App\Actions\Business\CreateBusiness;
use App\Actions\Role\AssignRole;
use App\Models\Medium;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('can create a medium using factory', function (): void {
    $user = User::factory()->create();
    (new AssignRole())->handle(user: $user, role: Role::business(), makeRoleActive: true);
    (new CreateBusiness())->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $medium = Medium::factory()->create([
        'model_id' => $user->id,
        'custom_properties' => json_encode(['businessId' => $user->key('business_id')]),
    ]);

    expect($medium)->toBeInstanceOf(Medium::class);
});

test('medium logs activity', function (): void {
    $user = User::factory()->create();
    (new AssignRole())->handle(user: $user, role: Role::business(), makeRoleActive: true);
    (new CreateBusiness())->handle(user: $user, businessName: 'laravel.com', makeBusinessActive: true);

    $medium = Medium::factory()->create([
        'model_id' => $user->id,
        'custom_properties' => json_encode(['businessId' => $user->key('business_id')]),
    ]);

    // Verify that the LogsActivity trait is properly set up
    $logOptions = $medium->getActivitylogOptions();

    expect($logOptions->logOnlyDirty)->toBeTrue()
        ->and($logOptions->logFillable)->toBeTrue();
});

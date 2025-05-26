<?php

declare(strict_types=1);

use App\Enums\PermissionEnum;
use App\Http\Controllers\BusinessController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function (): void {
    Route::get('business', [BusinessController::class, 'index'])
        ->middleware([PermissionEnum::BusinessUpdate->can(), 'check_has_business'])
        ->name('business');
});

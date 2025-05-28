<?php

declare(strict_types=1);

use App\Enums\PermissionEnum;
use App\Http\Controllers\PaymentMethodController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function (): void {
    Route::get('payment-methods', [PaymentMethodController::class, 'index'])
        ->middleware([PermissionEnum::PaymentMethodList->can(), 'auth', 'check_has_business'])
        ->name('payment-methods');
});

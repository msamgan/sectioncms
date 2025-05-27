<?php

declare(strict_types=1);

use App\Http\Controllers\PaymentMethodController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function (): void {
    Route::get('payment-methods', [PaymentMethodController::class, 'index'])
        ->name('payment-methods');
});

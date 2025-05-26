<?php

declare(strict_types=1);

use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('settings', [SettingsController::class, 'index'])->name('settings');
});

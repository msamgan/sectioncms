<?php

declare(strict_types=1);

use App\Enums\PermissionEnum;
use App\Http\Controllers\MediumController;
use Illuminate\Support\Facades\Route;

Route::get('medium', [MediumController::class, 'index'])
    ->middleware([PermissionEnum::MediumList->can(), 'auth', 'check_has_business'])
    ->name('medium.index');

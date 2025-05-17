<?php

declare(strict_types=1);

use App\Enums\PermissionEnum;
use App\Http\Controllers\LanguageController;
use Illuminate\Support\Facades\Route;

Route::get('language', [LanguageController::class, 'index'])
    ->middleware([PermissionEnum::LanguageList->can(), 'auth', 'check_has_business'])
    ->name('language.index');

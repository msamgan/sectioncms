<?php

declare(strict_types=1);

use App\Enums\PermissionEnum;
use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;

Route::get('section', [SectionController::class, 'index'])
    ->middleware([PermissionEnum::SectionList->can(), 'auth', 'check_has_business'])
    ->name('section.index');

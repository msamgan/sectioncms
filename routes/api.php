<?php

declare(strict_types=1);

use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Api\SectionController;
use Illuminate\Support\Facades\Route;

Route::get('section', [SectionController::class, 'index'])->name('api.section.index');
Route::get('languages', [LanguageController::class, 'index'])->name('api.language.index');

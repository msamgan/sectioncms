<?php

declare(strict_types=1);

use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Api\SectionController;
use Illuminate\Support\Facades\Route;

// Public API routes with a rate limiting
// 60 requests per minute for sections (content retrieval)
Route::get('section', [SectionController::class, 'index'])
    ->middleware('throttle:60,1')
    ->name('api.section.index');

// 30 requests per minute for languages (less frequent access needed)
Route::get('languages', [LanguageController::class, 'index'])
    ->middleware('throttle:30,1')
    ->name('api.language.index');

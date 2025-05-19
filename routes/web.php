<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('welcome');
Route::inertia('terms-and-conditions', 'TermsAndConditions')->name('terms');
Route::inertia('dashboard', 'Dashboard/Index')->middleware(['auth', 'verified'])->name('dashboard');

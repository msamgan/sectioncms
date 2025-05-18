<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome')->name('welcome');
Route::get('dashboard', fn () => Inertia::render('Dashboard/Index'))->middleware(['auth', 'verified'])->name('dashboard');

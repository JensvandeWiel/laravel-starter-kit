<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', fn (): Inertia\Response => Inertia\Inertia::render('welcome'))->middleware('auth');

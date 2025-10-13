<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/blog', [App\Http\Controllers\BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [App\Http\Controllers\BlogController::class, 'show'])->name('blog.post');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('analyzer', [App\Http\Controllers\AnalyzerController::class, 'index'])->name('analyzer');
    
    Route::get('history', function () {
        return Inertia::render('history');
    })->name('history');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

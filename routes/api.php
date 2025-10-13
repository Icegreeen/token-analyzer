<?php

use App\Http\Controllers\Api\TokenAnalysisController;
use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\Api\AlertController;
use Illuminate\Support\Facades\Route;

// Public Token Analysis (no auth required)
Route::middleware(['web'])->group(function () {
    Route::post('/analyze-token-public', [TokenAnalysisController::class, 'analyzePublic']);
});

// Token Analysis Routes
Route::middleware(['web', 'auth'])->group(function () {
    // Token Analysis
    Route::post('/analyze-token', [TokenAnalysisController::class, 'analyze']);
    Route::get('/analyses/history', [TokenAnalysisController::class, 'history']);
    Route::get('/analyses/limits/check', [TokenAnalysisController::class, 'limits']);
    Route::get('/analyses/{id}', [TokenAnalysisController::class, 'show']);

    // Wallets
    Route::get('/wallets', [WalletController::class, 'index']);
    Route::post('/wallets', [WalletController::class, 'store']);
    Route::get('/wallets/{id}', [WalletController::class, 'show']);
    Route::put('/wallets/{id}', [WalletController::class, 'update']);
    Route::delete('/wallets/{id}', [WalletController::class, 'destroy']);

    // Alerts
    Route::get('/alerts', [AlertController::class, 'index']);
    Route::get('/alerts/unread/count', [AlertController::class, 'unreadCount']);
    Route::post('/alerts/{id}/read', [AlertController::class, 'markAsRead']);
    Route::post('/alerts/read-all', [AlertController::class, 'markAllAsRead']);
    Route::delete('/alerts/{id}', [AlertController::class, 'destroy']);
});


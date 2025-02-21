<?php

use App\Http\Controllers\Auth\AuthOtpController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/notifications', [NotificationController::class, 'createNotification']);
Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::get('/notifications', [NotificationController::class, 'getAllNotifications']);






Route::post('/generate-otp', [AuthOtpController::class, 'generateOtpForLoginRegister'])->name('otp.generate');
Route::post('/verify-otp', [AuthOtpController::class, 'verifyOtp'])->name('otp.verify');


Route::post('/user/{id}', [UserController::class, 'update']);
Route::get('/user', [UserController::class, 'getAllUsers'])->middleware(['auth:sanctum', 'checkAdmin']);

Route::get('/user/{id}', [UserController::class, 'getUserById']);

Route::put('/user/{id}', [UserController::class, 'updateKycStatus'])->middleware(['auth:sanctum', 'admin']);
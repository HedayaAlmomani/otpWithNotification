<?php

use App\Http\Controllers\Auth\AuthOtpController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/notifications', [NotificationController::class, 'createNotification']);
Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::get('/notifications', [NotificationController::class, 'getUserNotifications'])->middleware(['auth:sanctum']);






Route::post('/generate-otp', [AuthOtpController::class, 'generateOtpForLoginRegister'])->name('otp.generate');
Route::post('/verify-otp', [AuthOtpController::class, 'verifyOtp'])->name('otp.verify');


Route::post('/user', [UserController::class, 'updateUserInfo'])->middleware(['auth:sanctum']);
Route::get('/user', [UserController::class, 'getAllUsers'])->middleware(['auth:sanctum', 'checkAdmin']);

Route::get('/user-data', [UserController::class, 'getUserFromToken'])->middleware(['auth:sanctum']);

Route::put('/user/{id}', [UserController::class, 'updateKycStatus'])->middleware(['auth:sanctum', 'checkAdmin']);
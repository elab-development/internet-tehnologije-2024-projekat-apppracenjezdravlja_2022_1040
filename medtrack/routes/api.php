<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\VitalSignController;

// javne 
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('patients', PatientController::class);
Route::apiResource('patients.encounters', EncounterController::class)->shallow();
Route::apiResource('encounters.vital-signs', VitalSignController::class)->shallow();

// zaštićene 
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

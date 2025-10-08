<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\VitalSignController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('patients', PatientController::class);
Route::apiResource('patients.encounters', EncounterController::class)->shallow();
Route::apiResource('encounters.vital-signs', VitalSignController::class)->shallow();
//pretraga pacijenata
Route::get('/patients/search', [PatientController::class, 'search']);Route::get('/patients/search', [PatientController::class, 'search']);
//statistika
Route::get('/stats/encounters/daily', [EncounterController::class, 'dailyStats']); // ?days=7
// health check 
Route::get('/health', fn() => response()->json(['status' => 'ok']));


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

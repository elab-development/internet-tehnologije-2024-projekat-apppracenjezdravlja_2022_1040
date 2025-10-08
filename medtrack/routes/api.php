<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\VitalSignController;

// javne rute
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::get('/health', fn() => response()->json(['status' => 'ok']));

// resursi (po potrebi premesti u protected grupu)
Route::apiResource('patients', PatientController::class);
Route::apiResource('patients.encounters', EncounterController::class)->shallow();
Route::apiResource('encounters.vital-signs', VitalSignController::class)->shallow();

// pretraga pacijenata
Route::get('/patients/search', [PatientController::class, 'search']);

// PROTECTED (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);

    Route::get('/test', function () {
        return response()->json(['message' => 'API radi']);
    });

    Route::get('/not-found', function () {
        abort(404);
    });

    Route::get('/error', function () {
        throw new \Exception('Test greska');
    });
});

// fallback (uvek poslednji, i obično VAN protected grupe)
Route::fallback(function () {
    return response()->json(['message' => 'Endpoint not found'], 404);
});
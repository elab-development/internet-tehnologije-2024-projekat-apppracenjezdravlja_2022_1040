<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\VitalSignController;


// Health check i test rute
Route::get('health', fn() => response()->json(['status' => 'ok']));
Route::get('test', fn() => response()->json(['message' => 'API radi']));

// Auth (register/login) su javne
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Patients — JAVNO: samo čitanje
Route::get   ('/patients',           [PatientController::class, 'index']);
Route::get   ('/patients/{patient}', [PatientController::class, 'show']);
Route::get   ('/patients/search',    [PatientController::class, 'search']);

// Encounters — JAVNO: čitanje pregleda nekog pacijenta
Route::get   ('/patients/{patient}/encounters', [EncounterController::class, 'index']);
// Vital signs — JAVNO: čitanje za određeni pregled
Route::get   ('/encounters/{encounter}/vital-signs', [VitalSignController::class, 'index']);
// Statistika — JAVNO (primer)
Route::get   ('/stats/encounters/daily', [EncounterController::class, 'dailyStats']);


Route::middleware('auth:sanctum')->group(function () {

    // me i logout
    Route::get ('/me',     [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Patient — CREATE/UPDATE/DELETE
    Route::post  ('/patients',           [PatientController::class, 'store']);
    Route::put   ('/patients/{patient}', [PatientController::class, 'update']);
    Route::patch ('/patients/{patient}', [PatientController::class, 'update']);
    Route::delete('/patients/{patient}', [PatientController::class, 'destroy']);

    // Encounter — CREATE/UPDATE/DELETE
    Route::post  ('/patients/{patient}/encounters', [EncounterController::class, 'store']);
    Route::get   ('/encounters/{encounter}',        [EncounterController::class, 'show']);   // čitanje može i javno ako želiš
    Route::put   ('/encounters/{encounter}',        [EncounterController::class, 'update']);
    Route::patch ('/encounters/{encounter}',        [EncounterController::class, 'update']);
    Route::delete('/encounters/{encounter}',        [EncounterController::class, 'destroy']);

    // VitalSign — CREATE/UPDATE/DELETE
    Route::post  ('/encounters/{encounter}/vital-signs', [VitalSignController::class, 'store']);
    Route::get   ('/vital-signs/{vital_sign}',           [VitalSignController::class, 'show']);   // čitanje može i javno ako želiš
    Route::put   ('/vital-signs/{vital_sign}',           [VitalSignController::class, 'update']);
    Route::patch ('/vital-signs/{vital_sign}',           [VitalSignController::class, 'update']);
    Route::delete('/vital-signs/{vital_sign}',           [VitalSignController::class, 'destroy']);
});

// fallback 
Route::fallback(function () {
    return response()->json(['message' => 'Endpoint not found'], 404);
});


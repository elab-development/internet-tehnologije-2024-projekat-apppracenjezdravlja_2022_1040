<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\VitalSignController;

//  Health check
Route::get('health', fn() => response()->json(['status' => 'ok']));
Route::get('test', fn() => response()->json(['message' => 'API radi']));

//  Registracija i login
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    //  Ko je ulogovan i logout
    Route::get ('me',     [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // ===============================
    // DOKTOR
    // ===============================
    Route::middleware('role:doctor')->group(function () {
        // Pacijenti
        Route::post  ('patients',           [PatientController::class, 'store']);
        Route::put   ('patients/{patient}', [PatientController::class, 'update']);
        Route::patch ('patients/{patient}', [PatientController::class, 'update']);
        Route::delete('patients/{patient}', [PatientController::class, 'destroy']);

        // Posete
        Route::post  ('patients/{patient}/encounters', [EncounterController::class, 'store']);
        Route::put   ('encounters/{encounter}',        [EncounterController::class, 'update']);
        Route::patch ('encounters/{encounter}',        [EncounterController::class, 'update']);
        Route::delete('encounters/{encounter}',        [EncounterController::class, 'destroy']);

        // Vitalni znaci
        Route::post  ('encounters/{encounter}/vital-signs', [VitalSignController::class, 'store']);
        Route::put   ('vital-signs/{vital_sign}',           [VitalSignController::class, 'update']);
        Route::patch ('vital-signs/{vital_sign}',           [VitalSignController::class, 'update']);
        Route::delete('vital-signs/{vital_sign}',           [VitalSignController::class, 'destroy']);
    });

    // ===============================
    //  PACIJENT — read-only pristup
    // ===============================
    Route::middleware('role:patient,doctor')->group(function () {
        // Pacijenti — svi mogu da čitaju, ali pacijent vidi samo svoj karton
        Route::get('patients',           [PatientController::class, 'index']);
        Route::get('patients/{patient}', [PatientController::class, 'show']);
        Route::get('patients/search',    [PatientController::class, 'searchPatients']);

        // Susreti
        Route::get('patients/{patient}/encounters', [EncounterController::class, 'index']);
        Route::get('encounters/{encounter}',        [EncounterController::class, 'show']);

        // Vitalni znaci
        Route::get('encounters/{encounter}/vital-signs', [VitalSignController::class, 'index']);
        Route::get('vital-signs/{vital_sign}',           [VitalSignController::class, 'show']);

        // Statistika
        Route::get('stats/encounters/daily', [EncounterController::class, 'dailyStats']);
    });
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    //  Samo pacijent može da kreira svoj karton
    Route::middleware('role:patient')->post('me/patient', [AuthController::class, 'createMyPatient']);
});
Route::middleware(['auth:sanctum','role:patient'])->group(function () {
    Route::put('me/patient',  [\App\Http\Controllers\API\AuthController::class, 'updateMyPatient']);
    Route::patch('me/patient',[\App\Http\Controllers\API\AuthController::class, 'updateMyPatient']);
});
// fallback
Route::fallback(fn() => response()->json(['message' => 'Endpoint not found'], 404));
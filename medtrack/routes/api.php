<?php

use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API radi']);
});

Route::get('/not-found', function () {
    abort(404);
});

Route::get('/error', function () {
    throw new Exception('Test greska');
});

Route::fallback(function () {
    return response()->json(['message' => 'Endpoint not found'], 404);
});

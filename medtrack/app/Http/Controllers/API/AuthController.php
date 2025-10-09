<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
public function register(Request $request)
    {
        //validacija ulaza
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            // 422 JSON 
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        //kreiranje korisnika (hash lozinke)
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // kreiranje tokena
        $token = $user->createToken('auth_token')->plainTextToken;

        //JSON odgovor
        return response()->json([
            'data'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer'
        ], 201);
    }

    //login
    public function login(Request $request)
    {
        // pokušaj autentifikaciju (email i password)
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user  = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'Hi ' . $user->name . ', welcome',
            'access_token' => $token,
            'token_type'   => 'Bearer'
        ]);
    }

    //logout
    public function logout(Request $request)
    {
        // obriši samo aktuelni token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    // ko je ulogovan
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}

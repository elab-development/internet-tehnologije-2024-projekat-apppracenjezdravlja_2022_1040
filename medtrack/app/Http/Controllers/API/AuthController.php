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
        $v = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email'=> 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);
        if ($v->fails()) return response()->json($v->errors(), 422);

        $user = User::create([
            'name' => $request->name,
            'email'=> $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token'=>$token, 'user'=>$user], 201);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json(['message'=>'Invalid credentials'], 401);
        }
        $user = User::where('email',$request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token'=>$token, 'user'=>$user]);
    }

    public function me(Request $request) {
        return $request->user();
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logged out']);
    }
}

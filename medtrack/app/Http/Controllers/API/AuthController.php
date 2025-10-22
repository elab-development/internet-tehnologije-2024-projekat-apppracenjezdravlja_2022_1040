<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Models\Patient;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name'     => 'required|string|max:255',
        'email'    => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
      
        'first_name'=> 'sometimes|string|max:255|nullable',
        'last_name' => 'sometimes|string|max:255|nullable',
        'gender'    => 'sometimes|in:male,female,other|nullable',
        'dob'       => 'sometimes|date|nullable',
    ]);
    if ($validator->fails()) {
        return response()->json(['message'=>'Validation failed','errors'=>$validator->errors()], 422);
    }

    //  uvek patient (niko ne može doktor kroz register)
    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
        'role'     => 'patient',
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'data'         => $user->only(['id','name','email','role','patient_id']),
        'access_token' => $token,
        'token_type'   => 'Bearer',
        'role'         => $user->role,
        'patient_id'   => $user->patient_id,
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
            'token_type'   => 'Bearer',
            'role'         => $user->role,         
    'patient_id'   => $user->patient_id
        ]);
    }

    //logout
    public function logout(Request $request)
    {
        // obriši samo aktuelni token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }


    public function createMyPatient(Request $request)
{
    $user = $request->user();

    // dozvoljeno samo pacijentima bez kartona
    if ($user->role !== 'patient') {
        return response()->json(['message' => 'Only patients can create their own chart'], 403);
    }
    if ($user->patient_id) {
        return response()->json(['message' => 'Chart already exists'], 409);
    }


    
    // validacija opcionalnih podataka
    $data = $request->validate([
        'first_name'=> 'sometimes|string|max:255|nullable',
        'last_name' => 'sometimes|string|max:255|nullable',
        'gender'    => 'sometimes|in:male,female,other|nullable',
        'dob'       => 'sometimes|date|nullable',
    ]);

    // probaj da izvučeš first/last iz user.name ako nije prosleđeno
    $first = $data['first_name'] ?? Str::before($user->name, ' ') ?: $user->name;
    $last  = $data['last_name']  ?? (trim(Str::after($user->name, ' ')) ?: null);

    $patient = Patient::create([
        'first_name' => $first,
        'last_name'  => $last,
        'gender'     => $data['gender'] ?? null,
        'dob'        => $data['dob'] ?? null,
    ]);

    $user->patient_id = $patient->id;
    $user->save();

    return response()->json([
        'message' => 'Patient chart created',
        'patient' => $patient,
        'user'    => $user->only(['id','name','email','role','patient_id']),
    ], 201);
}

public function updateMyPatient(\Illuminate\Http\Request $request)
{
    $user = $request->user();

    if ($user->role !== 'patient') {
        return response()->json(['message' => 'Only patients can update their chart'], 403);
    }
    if (!$user->patient_id) {
        return response()->json(['message' => 'Chart does not exist'], 409);
    }

    // Validacija polja koja dozvoljavamo da menja
    $data = $request->validate([
        'first_name'=> 'sometimes|required|string|max:255',
        'last_name' => 'sometimes|required|string|max:255',
        'dob'       => 'sometimes|required|date',
        'gender'    => 'sometimes|required|in:male,female,other',
        'address'   => 'sometimes|required|string|max:255',
        'phone'     => 'sometimes|required|string|max:50',
    ]);

    $patient = \App\Models\Patient::findOrFail($user->patient_id);
    $patient->update($data);

    return response()->json([
        'message' => 'Patient chart updated',
        'patient' => $patient->fresh(),
    ]);
}



    // ko je ulogovan
    public function me(Request $request)
{
    return response()->json($request->user()->only(['id','name','email','role','patient_id']));
}
}

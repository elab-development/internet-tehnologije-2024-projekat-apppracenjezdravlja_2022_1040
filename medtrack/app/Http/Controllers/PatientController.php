<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    // GET /api/patients
    public function index(Request $request)
{
    $user = $request->user();

    if ($user->role === 'doctor') {
        return response()->json(\App\Models\Patient::orderBy('last_name')->paginate(10));
    }

    // patient
    if ($user->patient_id) {
        $one = \App\Models\Patient::where('id', $user->patient_id)->paginate(10);
        return response()->json($one);
    }

    return response()->json([]); // nema mapiran patient
}

    // POST /api/patients
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'dob'        => 'nullable|date',
            'gender'     => 'nullable|in:male,female',
            'phone'      => 'nullable|string|max:100',
            'address'    => 'nullable|string',
            'email'      => 'nullable|email|max:255|unique:patients,email',
            'user_id'    => 'nullable|exists:users,id',
        ]);

        $patient = Patient::create($data);
        return response()->json($patient, 201);
    }

    // GET /api/patients/{patient}
    public function show(Request $request, \App\Models\Patient $patient)
{
    $user = $request->user();
    if ($user->role === 'doctor') return response()->json($patient);

    if ($user->patient_id !== $patient->id) {
        return response()->json(['message' => 'Forbidden'], 403);
    }
    return response()->json($patient);
}

    // PUT/PATCH /api/patients/{patient}
    public function update(Request $request, Patient $patient)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:100',
            'last_name'  => 'sometimes|required|string|max:100',
            'dob'        => 'nullable|date',
            'gender'     => 'nullable|in:male,female',
            'phone'      => 'nullable|string|max:100',
            'address'    => 'nullable|string',
            'email'      => 'nullable|email|max:255|unique:patients,email,' . $patient->id,
            'user_id'    => 'nullable|exists:users,id',
        ]);

        $patient->update($data);
        return response()->json($patient);
    }

    // DELETE /api/patients/{patient}
   public function destroy(\Illuminate\Http\Request $request, \App\Models\Patient $patient)
{
    

   
    $patient->delete();

    return response()->noContent(); // 204
}

    public function searchPatients(Request $request)  // OBRISI Patient $patient parametar!
{
    $name = $request->query('name');

    if (!$name) {
        return response()->json(['message' => 'Query parameter "name" is required'], 422);
    }

    $patients = Patient::where('first_name','like',"%{$name}%")
        ->orWhere('last_name','like',"%{$name}%")
        ->limit(20)
        ->get();

    return response()->json($patients);
}
}
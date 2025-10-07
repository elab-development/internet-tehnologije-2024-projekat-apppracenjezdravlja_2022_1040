<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    // GET /api/patients
    public function index()
    {
        return response()->json(
            Patient::withCount('encounters')->latest()->paginate(10)
        );
    }

    // POST /api/patients
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'date_of_birth'        => 'nullable|date',
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
    public function show(Patient $patient)
    {
        return response()->json(
            $patient->load(['encounters.vitalSigns','user'])
        );
    }

    // PUT/PATCH /api/patients/{patient}
    public function update(Request $request, Patient $patient)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:100',
            'last_name'  => 'sometimes|required|string|max:100',
            'date_of_birth'        => 'nullable|date',
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
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->noContent();
    }
}
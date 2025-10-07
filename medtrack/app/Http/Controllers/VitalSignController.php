<?php

namespace App\Http\Controllers;

use App\Models\VitalSign;
use Illuminate\Http\Request;

class VitalSignController extends Controller
{
    // GET /api/encounters/{encounter}/vital-signs
    public function index(Encounter $encounter)
    {
        return response()->json(
            $encounter->vitalSigns()->latest()->paginate(20)
        );
    }

    // POST /api/encounters/{encounter}/vital-signs
    public function store(Request $request, Encounter $encounter)
    {
        $data = $request->validate([
            'temperature' => 'nullable|numeric',
            'pulse'     => 'nullable|integer|min:0',
            'systolic'      => 'nullable|integer|min:0',
            'diastolic'     => 'nullable|integer|min:0',
            'respiration'     => 'nullable|integer|min:0',
            'saturation'          => 'nullable|integer|min:0|max:100',
        ]);

        $data['encounter_id'] = $encounter->id;

        $vital = VitalSign::create($data);
        return response()->json($vital, 201);
    }

    // GET /api/vital-signs/{vital_sign}
    public function show(VitalSign $vital_sign)
    {
        return response()->json($vital_sign->load('encounter.patient'));
    }

    // PUT/PATCH /api/vital-signs/{vital_sign}
    public function update(Request $request, VitalSign $vital_sign)
    {
        $data = $request->validate([
            'temperature' => 'nullable|numeric',
            'pulse'     => 'nullable|integer|min:0',
            'systolic'      => 'nullable|integer|min:0',
            'diastolic'     => 'nullable|integer|min:0',
            'respiration'     => 'nullable|integer|min:0',
            'saturation'          => 'nullable|integer|min:0|max:100',
        ]);

        $vital_sign->update($data);
        return response()->json($vital_sign->load('encounter.patient'));
    }

    // DELETE /api/vital-signs/{vital_sign}
    public function destroy(VitalSign $vital_sign)
    {
        $vital_sign->delete();
        return response()->noContent();
    }
}

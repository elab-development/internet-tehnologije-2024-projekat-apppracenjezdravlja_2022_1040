<?php

namespace App\Http\Controllers;

use App\Models\Encounter;   
use App\Models\VitalSign;
use Illuminate\Http\Request;

class VitalSignController extends Controller
{
    // GET /api/encounters/{encounter}/vital-signs
    public function index(Encounter $encounter)
    {
        
        return response()->json(
            $encounter->vitalSigns()->orderBy('created_at', 'desc')->paginate(20)
        );
    }

    // POST /api/encounters/{encounter}/vital-signs
    public function store(Request $request, Encounter $encounter)
    {
        $data = $request->validate([
            'temperature' => 'nullable|numeric',
            'pulse'       => 'nullable|integer|min:0',
            'systolic'    => 'nullable|integer|min:0',
            'diastolic'   => 'nullable|integer|min:0',
            'respiration' => 'nullable|integer|min:0',
            'saturation'  => 'nullable|integer|min:0|max:100',
        ]);

        
        $hasAny =
            array_key_exists('temperature', $data) && $data['temperature'] !== null ||
            array_key_exists('pulse',       $data) && $data['pulse']       !== null ||
            array_key_exists('systolic',    $data) && $data['systolic']    !== null ||
            array_key_exists('diastolic',   $data) && $data['diastolic']   !== null ||
            array_key_exists('respiration', $data) && $data['respiration'] !== null ||
            array_key_exists('saturation',  $data) && $data['saturation']  !== null;

        if (!$hasAny) {
            return response()->json(['message' => 'Unesi bar jedan vitalni parametar.'], 422);
        }

        $data['encounter_id'] = $encounter->id;

        $vital = VitalSign::create($data);

        return response()->json([
            'message' => 'Vital created',
            'data'    => $vital,
        ], 201);
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
            'pulse'       => 'nullable|integer|min:0',
            'systolic'    => 'nullable|integer|min:0',
            'diastolic'   => 'nullable|integer|min:0',
            'respiration' => 'nullable|integer|min:0',
            'saturation'  => 'nullable|integer|min:0|max:100',
        ]);

        
        if (empty(array_filter($data, fn($v) => $v !== null && $v !== ''))) {
            return response()->json(['message' => 'Unesi bar jedan vitalni parametar.'], 422);
        }

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
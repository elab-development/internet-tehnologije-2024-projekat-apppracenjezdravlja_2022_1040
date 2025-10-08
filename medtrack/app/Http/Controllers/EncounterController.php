<?php

namespace App\Http\Controllers;

use App\Models\Encounter;
use Illuminate\Http\Request;

class EncounterController extends Controller
{
    
    // GET /api/patients/{patient}/encounters
    public function index(Patient $patient)
    {
        $encounters = $patient->encounters()
            ->with(['clinician','vitalSigns'])
            ->latest('visit_time')
            ->paginate(10);

        return response()->json($encounters);
    }

    // POST /api/patients/{patient}/encounters
    public function store(Request $request, Patient $patient)
    {
        $data = $request->validate([
            'user_id'     => 'required|exists:users,id',        // lekar/sestra
            'visit_time' => 'nullable|date',
            'type'        => 'nullable|in:visit,telehealth,emergency',
            'notes'       => 'nullable|string',
            'status'      => 'nullable|in:open,closed',
        ]);

        $data['patient_id'] = $patient->id;

        $encounter = Encounter::create($data);
        return response()->json($encounter->load('clinician','patient'), 201);
    }

    // GET /api/encounters/{encounter}
    public function show(Encounter $encounter)
    {
        return response()->json(
            $encounter->load(['patient','clinician','vitalSigns'])
        );
    }

    // PUT/PATCH /api/encounters/{encounter}
    public function update(Request $request, Encounter $encounter)
    {
        $data = $request->validate([
            'user_id'     => 'sometimes|exists:users,id',
            'visit_time' => 'nullable|date',
            'type'        => 'nullable|in:visit,telehealth,emergency',
            'notes'       => 'nullable|string',
            'status'      => 'nullable|in:open,closed',
        ]);

        $encounter->update($data);
        return response()->json($encounter->load('patient','clinician','vitalSigns'));
    }

    // DELETE /api/encounters/{encounter}
    public function destroy(Encounter $encounter)
    {
        $encounter->delete();
        return response()->noContent();
    }
    public function dailyStats(\Illuminate\Http\Request $request)
{
    $days = (int)($request->query('days', 7));

    $rows = \App\Models\Encounter::selectRaw('DATE(occurred_at) as day, COUNT(*) as total')
        ->where('occurred_at', '>=', now()->subDays($days))
        ->groupBy('day')
        ->orderBy('day', 'asc')
        ->get();

    return response()->json($rows);
}
}

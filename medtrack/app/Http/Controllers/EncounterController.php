<?php

namespace App\Http\Controllers;

use App\Models\Patient;
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
    // Dozvoli ono što stvarno treba da dođe sa fronta
    $validated = $request->validate([
        'visit_time' => 'required|date', // frontend šalje "YYYY-MM-DD HH:mm:00"
        'type'       => 'required|in:visit,telehealth,emergency', // vidi Napomenu ispod
        'notes'      => 'nullable|string',
        'status'     => 'required|in:open,closed', // vidi Napomenu ispod
    ]);

    $encounter = new Encounter();
    $encounter->patient_id = $patient->id;       // iz rute /patients/{patient}/encounters
    $encounter->user_id    = $request->user()->id; // iz auth tokena
    $encounter->visit_time = $validated['visit_time'];
    $encounter->type       = $validated['type'];
    $encounter->notes      = $validated['notes'] ?? null;
    $encounter->status     = $validated['status'];
    $encounter->save();

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
    public function dailyStats(Request $request)
{
    $days = (int)($request->query('days', 7));

    $rows = Encounter::selectRaw('DATE(occurred_at) as day, COUNT(*) as total')
        ->where('occurred_at', '>=', now()->subDays($days))
        ->groupBy('day')
        ->orderBy('day', 'asc')
        ->get();

    return response()->json($rows);
}
}

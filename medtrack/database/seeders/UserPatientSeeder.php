<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Patient;

class UserPatientSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            // 1) Doktor (updateOrCreate da ne duplira pri ponovnom seed-u)
            $doctor = User::updateOrCreate(
                ['email' => 'drmilos@primer.com'],
                [
                    'name'       => 'Dr. Milos',
                    'password'   => Hash::make('password123'),
                    'role'       => 'doctor',
                    'patient_id' => null,
                ]
            );

            // 2) Pacijent u tabeli patients
            $patient = Patient::updateOrCreate(
                [
                    'first_name' => 'Milan',
                    'last_name'  => 'Milanović',
                    'dob'        => '1990-05-12',  // prilagodi formatu kolone ako je drugačiji
                ],
                [
                    'gender'     => 'male',
                ]
            );

            // 3) User nalog za tog pacijenta 
            $patientUser = User::updateOrCreate(
                ['email' => 'pacijentmilan@primer.com'],
                [
                    'name'       => 'Milan Milanović',
                    'password'   => Hash::make('password123'),
                    'role'       => 'patient',
                    'patient_id' => $patient->id,
                ]
            );

            // 4)  ako Patient model ima relaciju user(), ažuriraj unazad
            if (method_exists($patient, 'user')) {
                $patient->user()->associate($patientUser)->save();
            }

            // Info u konzoli
            $this->command->info(' Seed završen: doktor i pacijent kreirani.');
            $this->command->line('   Doctor login:  drmilos@primer.com  /  password123');
            $this->command->line('   Patient login: pacijentmilan@primer.com   /  password123');
        });
    }
}
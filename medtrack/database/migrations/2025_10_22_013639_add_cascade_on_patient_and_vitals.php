<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Encounters → patient_id
        Schema::table('encounters', function (Blueprint $table) {
            // najpre ukloni postojeći FK ako nije sa kaskadom
            try { $table->dropForeign(['patient_id']); } catch (\Throwable $e) {}
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
        });

        // Vital signs → encounter_id
        Schema::table('vital_signs', function (Blueprint $table) {
            try { $table->dropForeign(['encounter_id']); } catch (\Throwable $e) {}
            $table->foreign('encounter_id')->references('id')->on('encounters')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('vital_signs', function (Blueprint $table) {
            try { $table->dropForeign(['encounter_id']); } catch (\Throwable $e) {}
            $table->foreign('encounter_id')->references('id')->on('encounters');
        });

        Schema::table('encounters', function (Blueprint $table) {
            try { $table->dropForeign(['patient_id']); } catch (\Throwable $e) {}
            $table->foreign('patient_id')->references('id')->on('patients');
        });
    }
};
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('patient')->after('password'); // 'doctor' | 'patient'
            $table->unsignedBigInteger('patient_id')->nullable()->after('role');

            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('set null');
        });
    }
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['patient_id']);
            $table->dropColumn(['role', 'patient_id']);
        });
    }
};
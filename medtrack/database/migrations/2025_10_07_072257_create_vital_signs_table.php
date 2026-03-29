<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vital_signs', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->id();
        $table->foreignId('encounter_id')->constrained()->cascadeOnDelete();

        $table->decimal('temperature',4,1)->nullable();
        $table->unsignedSmallInteger('pulse')->nullable();
        $table->unsignedSmallInteger('systolic')->nullable();
        $table->unsignedSmallInteger('diastolic')->nullable();
        $table->unsignedTinyInteger('respiration')->nullable();
        $table->unsignedTinyInteger('saturation')->nullable();

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vital_signs');
    }
};

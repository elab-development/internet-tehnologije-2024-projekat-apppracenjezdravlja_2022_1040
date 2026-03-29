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
         Schema::create('encounters', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->id();
        $table->foreignId('patient_id')->constrained()->cascadeOnDelete(); // pregled pripada pacijentu
        $table->foreignId('user_id')->constrained('users');                //pregled obavio (lekar/sestra)
        $table->timestamp('occurred_at')->useCurrent();
        $table->enum('type',['visit','telehealth','emergency'])->default('visit');
        $table->text('notes')->nullable();
        $table->enum('status',['open','closed'])->default('open');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encounters');
    }
};

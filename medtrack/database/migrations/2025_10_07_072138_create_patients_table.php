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
        Schema::create('patients', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->id();

       
        $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

        $table->string('first_name');
        $table->string('last_name');
        $table->date('dob')->nullable();
        $table->enum('gender',['male','female'])->nullable();
        $table->string('blood_type')->nullable();           $table->string('phone', 50)->nullable();
        $table->string('address')->nullable();

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};

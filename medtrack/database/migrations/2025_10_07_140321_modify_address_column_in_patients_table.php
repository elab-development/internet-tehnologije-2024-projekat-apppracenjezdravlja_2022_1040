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
        Schema::table('patients', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->text('address')->nullable()->change();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->string('address', 255)->nullable()->change();
        });
    }
};

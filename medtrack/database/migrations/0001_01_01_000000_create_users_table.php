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
    Schema::table('users', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->enum('role', ['doctor','nurse','admin','patient'])->default('patient');
    });
}
public function down(): void
{
    Schema::table('users', function (Illuminate\Database\Schema\Blueprint $table) {
        $table->dropColumn('role');
    });
}

};

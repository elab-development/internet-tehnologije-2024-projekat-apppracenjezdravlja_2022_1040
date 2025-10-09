<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        if (Schema::hasColumn('patients', 'blood_type')) {
            Schema::table('patients', function (Blueprint $table) {
                $table->dropColumn('blood_type');
            });
        }
    }

  
    public function down(): void
    {
       if (!Schema::hasColumn('patients', 'blood_type')) {
            Schema::table('patients', function (Blueprint $table) {
                $table->string('blood_type')->nullable();
            });
        }
    }
};

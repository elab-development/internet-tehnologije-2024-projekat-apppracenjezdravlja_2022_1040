<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVisitTimeToEncountersTable extends Migration
{
    public function up()
    {
        Schema::table('encounters', function (Blueprint $table) {
            $table->dateTime('visit_time')->nullable()->after('user_id');
        });
    }

    public function down()
    {
        Schema::table('encounters', function (Blueprint $table) {
            $table->dropColumn('visit_time');
        });
    }
}
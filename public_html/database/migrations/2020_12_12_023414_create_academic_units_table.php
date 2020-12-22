<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcademicUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_units', function (Blueprint $table) {
            $table->id();
            $table->string('promep_key');
            $table->string('degree_of_consolidation');
            $table->string('leader_name');
            $table->string('academic_unit_name');
            $table->string('uabc_area');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_units');
    }
}

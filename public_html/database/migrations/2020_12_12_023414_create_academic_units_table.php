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
            $table->string('academic_unit_name');
            $table->string('degree_of_consolidation');
            $table->dateTime('register_date');
            $table->dateTime('next_revision_date');
            $table->integer('prodep_area_id');
            $table->integer('leader_id');       
            $table->integer('uabc_area_id');
            $table->integer('displine_id');
            $table->integer('des_id');
            $table->boolean('active');
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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcademicBodiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_bodies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('prodep_key');
            $table->boolean('active');
            $table->integer('lead_employee_id')->unsigned();
            $table->integer('prodep_area_id')->unsigned();
            $table->integer('uabc_areas_id')->unsigned();
            $table->integer('discipline_id')->unsigned();
            $table->integer('des_id')->unsigned();
            $table->timestamps();
            $table->foreign('uabc_areas_id')->references('narea')->on('areas_con')->onDelete('cascade');
            $table->foreign('lead_employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
            $table->foreign('des_id')->references('cdes')->on('des')->onDelete('cascade');
            $table->foreign('discipline_id')->references('id')->on('disciplines')->onDelete('cascade');
            $table->foreign('prodep_area_id')->references('id')->on('prodep_areas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_bodies');
    }
}

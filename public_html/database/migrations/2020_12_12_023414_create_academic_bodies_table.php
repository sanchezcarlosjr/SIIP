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
            $table->string('prodep_key')->unique();
            $table->boolean('active');
            $table->integer('lead_employee_id')->unsigned()->nullable();
            $table->integer('prodep_area_id')->unsigned();
            $table->string('discipline');
            $table->integer('des_id')->unsigned();
            $table->timestamps();
            $table->foreign('lead_employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
            $table->foreign('des_id')->references('cdes')->on('des')->onDelete('cascade');
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

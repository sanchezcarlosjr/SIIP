<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prodep_profiles', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->date('finish_date');
            $table->integer('employee_id')->unsigned();
            $table->integer('prodep_area_id')->unsigned();
            $table->timestamps();
            $table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
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
        Schema::dropIfExists('prodep_profiles');
    }
}

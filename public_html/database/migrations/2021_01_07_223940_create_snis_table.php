<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSnisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('snis', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->date('finish_date');
            $table->string('discipline');
            $table->string('field');
            $table->string('request');
            $table->string('level');
            $table->date('specialty');
            $table->integer('employee_id')->unsigned();
            $table->integer('sni_area_id')->unsigned();
            $table->timestamps();
            $table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('snis');
    }
}

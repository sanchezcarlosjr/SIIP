<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRightPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('right_pits', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('status_transact');
            $table->string('kind');
            $table->date('date');
            $table->integer('cgip_project')->unsigned();
            $table->integer('employee_id')->unsigned();
            $table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
            $table->integer('academic_unit_id')->unsigned();
            $table->foreign('academic_unit_id')->references('nunidad')->on('unidades')->onDelete('cascade');
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
        Schema::dropIfExists('right_pits');
    }
}

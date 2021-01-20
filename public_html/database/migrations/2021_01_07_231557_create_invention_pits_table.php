<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventionPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invention_pits', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('status_transact');
            $table->string('kind');
            $table->date('request_date');
            $table->date('grant_date');
            $table->integer('request_amount');
            $table->integer('cgip_project_id')->unsigned();
            $table->integer('employee_id')->unsigned();
            $table->foreign("employee_id")->references('nempleado')->on('empleados')->onDelete('cascade');
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
        Schema::dropIfExists('invention_pits');
    }
}

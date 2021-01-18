<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepNPTCSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prodep_nptcs', function (Blueprint $table) {
            $table->id();
            $table->float('amount');
            $table->string('type');
            $table->date('date');
            $table->timestamps();
            $table->integer('benefited_employee_id')->unsigned();
            $table->foreign('benefited_employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prodep_nptcs');
    }
}

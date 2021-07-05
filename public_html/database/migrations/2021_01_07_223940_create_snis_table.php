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
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('disciplina');
            $table->string('campo');
            $table->string('nombramiento')->nullable();
            $table->string('nivel');
            $table->string('especialidad');
            $table->string('nombramiento_url')->nullable();
            $table->integer('nempleado')->unsigned();
            $table->integer('sni_areas_id')->unsigned();
            $table->timestamps();
            $table->foreign('nempleado')->references('nempleado')->on('empleados')->onDelete('cascade');
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

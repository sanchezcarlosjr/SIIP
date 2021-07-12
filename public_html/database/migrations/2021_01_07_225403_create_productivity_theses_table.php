<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityThesesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productividad_tesis', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('estudiante');
            $table->string('tipo');
            $table->date('fecha_de_obtencion');
            $table->string('grado');
            $table->integer('nempleado')->unsigned();
            #$table->foreign('nempleado')->references('nempleado')->on('empleados')->onDelete('cascade');
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
        Schema::dropIfExists('productividad_tesis');
    }
}

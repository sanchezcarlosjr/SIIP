<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productividad_informes', function (Blueprint $table) {
            $table->id();
            $table->string('proyecto');
            $table->string('autores');
            $table->date('fecha_de_publicacion');
            $table->string('instituto');
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
        Schema::dropIfExists('productividad_informes');
    }
}

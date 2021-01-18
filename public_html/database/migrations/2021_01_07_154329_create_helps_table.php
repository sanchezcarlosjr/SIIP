<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateHelpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_bodies_helps', function (Alueprint #$table) {
            #$table->id();
            #$table->float('amount');
            #$table->string('type');
            #$table->date('date');
            #$table->timestamps();
            #$table->integer('academic_body_id')->unsigned();
            #$table->foreign('academic_body_id')->references('id')->on('academic_bodies')->onDelete('cascade');
            #$table->integer('benefited_employee_id')->unsigned();
            #$table->foreign('benefited_employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_bodies_helps');
    }
}

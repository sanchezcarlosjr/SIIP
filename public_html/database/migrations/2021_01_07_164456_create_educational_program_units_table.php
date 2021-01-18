<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalProgramUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educational_program_units', function (Alueprint #$table) {
            #$table->id();
            #$table->integer('educational_program_id')->unsigned();
            #$table->foreign('educational_program_id')->references('id')->on('educational_programs')->onDelete('cascade');
            #$table->timestamps();
            #$table->integer('academic_unit_id')->unsigned();
            #$table->foreign('academic_unit_id')->references('nunidad')->on('unidades')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('educational_program_units');
    }
}

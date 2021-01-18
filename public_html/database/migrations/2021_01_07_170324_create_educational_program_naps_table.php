<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalProgramNapsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educational_program_naps', function (Alueprint #$table) {
            #$table->id();
            #$table->integer('educational_program_unit_id')->unsigned();
            #$table->foreign('educational_program_unit_id')->references('id')->on('educational_program_units')->onDelete('cascade');
            #$table->timestamps();
            #$table->integer('employee_id')->unsigned();
            #$table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('educational_program_naps');
    }
}

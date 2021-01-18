<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateModificationEducationalProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modification_educational_programs', function (Alueprint #$table) {
            #$table->id();
            #$table->date('date');
            #$table->string('actual_status');
            #$table->string('process_plan');
            #$table->timestamps();
            #$table->integer('educational_program_id')->unsigned();
            #$table->foreign('educational_program_id')->references('id')->on('educational_programs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modification_educational_programs');
    }
}

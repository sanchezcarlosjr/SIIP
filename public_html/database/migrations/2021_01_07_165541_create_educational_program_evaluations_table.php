<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalProgramEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educational_program_evaluations', function (Blueprint $table) {
            $table->id();
            $table->date('vigency_date');
            $table->string('process_plan');
            $table->string('level_pnpc');
            $table->timestamps();
            $table->integer('educational_program_id')->unsigned();
            $table->foreign('educational_program_id')->references('id')->on('educational_programs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('educational_program_evaluations');
    }
}

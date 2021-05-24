<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_bodies_evaluations', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->date('finish_date')->nullable();
            $table->string('grade');
            $table->timestamps();
            $table->integer('academic_body_id')->unsigned();
            $table->foreign('academic_body_id')->references('id')->on('academic_bodies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_bodies_evaluations');
    }
}

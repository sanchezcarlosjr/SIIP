<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultancyPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultancy_pits', function (Alueprint #$table) {
            #$table->id();
            #$table->string('applicant_name');
            #$table->string('kind_of_application');
            #$table->string('motive');
            #$table->date('date');
            #$table->integer('academic_unit_id')->unsigned();
            #$table->foreign('academic_unit_id')->references('nunidad')->on('unidades')->onDelete('cascade');
            #$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consultancy_pits');
    }
}

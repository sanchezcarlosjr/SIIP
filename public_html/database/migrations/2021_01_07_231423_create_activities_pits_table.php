<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitiesPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities_pits', function (Alueprint #$table) {
            #$table->id();
            #$table->string('kind_of_applicant');
            #$table->string('name_event');
            #$table->string('asistence');
            #$table->string('goal');
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
        Schema::dropIfExists('activities_pits');
    }
}

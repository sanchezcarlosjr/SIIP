<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateNetworksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_bodies_networks', function (Alueprint #$table) {
            #$table->id();
            #$table->string('name');
            #$table->string('type');
            #$table->string('class');
            #$table->string('range');
            #$table->date('start_date');
            #$table->date('finish_date');
            #$table->timestamps();
            #$table->integer('academic_body_id')->unsigned();
            #$table->foreign('academic_body_id')->references('id')->on('academic_bodies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_bodies_networks');
    }
}

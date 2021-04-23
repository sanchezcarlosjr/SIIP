<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::create('academic_bodies_networks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->nullable();
            $table->string('class')->nullable();
            $table->string('range');
            $table->string('formation_url')->nullable();
            $table->date('start_date');
            $table->date('finish_date');
            $table->integer('network_lead_id')->unsigned()->nullable();
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
        Schema::disableForeignKeyConstraints();
        Schema::dropColumns('academic_bodies_networks', ['network_lead_id']);
        Schema::dropColumns('collaborator_networks', ['academic_bodies_network_id']);
        Schema::dropIfExists('academic_bodies_networks');
        Schema::dropIfExists('collaborator_networks');
    }
}

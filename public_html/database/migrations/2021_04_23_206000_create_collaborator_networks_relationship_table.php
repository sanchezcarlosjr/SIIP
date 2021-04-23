<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollaboratorNetworksRelationshipTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collaborator_networks', function (Blueprint $table) {
            $table->foreign('academic_bodies_network_id')->references('id')->on('academic_bodies_networks');
        });
        Schema::table('academic_bodies_networks', function (Blueprint $table) {
            $table->foreign('network_lead_id')->references('id')->on('collaborator_networks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}

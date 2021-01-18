<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventorPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventor_pits', function (Alueprint #$table) {
            #$table->id();
            #$table->integer('invention_id')->unsigned();
            #$table->foreign('invention_id')->references('id')->on('invention_pits')->onDelete('cascade');
            #$table->integer('employee_id')->unsigned();
            #$table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
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
        Schema::dropIfExists('inventor_pits');
    }
}

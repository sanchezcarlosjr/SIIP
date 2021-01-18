<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productivity_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('authors');
            $table->string('volume');
            $table->string('published_at');
            $table->string('megazine');
            $table->string('megazine_url');
            $table->string('url');
            $table->string('doi');
            $table->string('impact_factor');
            $table->integer('employee_id')->unsigned();
            $table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productivity_items');
    }
}

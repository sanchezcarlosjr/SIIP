<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityAooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productivity_books', function (Alueprint #$table) {
            #$table->id();
            #$table->string('title');
            #$table->string('authors');
            #$table->string('partipation_type');
            #$table->string('editorial');
            #$table->string('url_editorial');
            #$table->string('isbn');
            #$table->string('doi');
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
        Schema::dropIfExists('productivity_books');
    }
}

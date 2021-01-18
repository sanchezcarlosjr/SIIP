<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityPrototypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productivity_prototypes', function (Alueprint #$table) {
            #$table->id();
            #$table->string('title');
            #$table->string('authors');
            #$table->string('register_number');
            #$table->date('published_at');
            #$table->string('type');
            #$table->string('institute');
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
        Schema::dropIfExists('productivity_prototypes');
    }
}

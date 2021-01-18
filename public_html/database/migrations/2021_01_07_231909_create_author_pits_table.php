<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthorPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('author_pits', function (Blueprint $table) {
            $table->id();
            $table->integer('right_id')->unsigned();
            $table->foreign('right_id')->references('id')->on('right_pits')->onDelete('cascade');
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
        Schema::dropIfExists('author_pits');
    }
}

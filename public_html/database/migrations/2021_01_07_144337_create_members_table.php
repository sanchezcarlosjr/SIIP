<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_body_member', function (Blueprint $table) {
            $table->id();
            $table->integer('academic_bodies_lgacs_id')->unsigned();
            $table->integer('employee_id')->unsigned();
            $table->timestamps();
            $table->foreign('academic_bodies_lgacs_id')->references('id')->on('academic_bodies_lgacs')->onDelete('cascade');
            $table->foreign('employee_id')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_body_member');
    }
}

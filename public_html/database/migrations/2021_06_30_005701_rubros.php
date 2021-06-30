<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Rubros extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prodep_rubros', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount');
            $table->boolean('authorized');
            $table->string('name');
            /** Polymorph */
            $table->integer('rubrable_id');
            $table->string('rubrable_type');
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
        Schema::dropIfExists('prodep_rubros');
    }
}

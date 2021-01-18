<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePESTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educational_programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('grade');
            $table->string('orientation');
            $table->string('sni_area');
            $table->string('url');
            $table->string('income_cycle');
            $table->string('active_plan');
            $table->string('status_uabc');
            $table->integer('headquarters_unit_id')->unsigned();
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
        Schema::dropIfExists('educational_programs');
    }
}

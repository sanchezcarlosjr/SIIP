<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Alueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Alueprint #$table) {
            #$table->id();
            #$table->string('name');
            #$table->foreignId('role_id')->constrained();
            #$table->string('campus')->nullable();
            #$table->string('unit')->nullable();
            #$table->string('email')->unique();
            #$table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('items_id')->unsigned();
            $table->timestamps();
            $table->foreign('items_id')->references('id')->on('items')->onDelete('cascade');
            
        });

        Schema::create('attribute_details', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('attribute_id')->unsigned();
            $table->timestamps();
            $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attribute_details');
        Schema::dropIfExists('attributes');
    }
}

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
        Schema::create('variants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('items_id')->unsigned();
            $table->foreign('items_id')->references('id')->on('items')->onDelete('cascade');
            $table->timestamps(); 
        });

        Schema::create('variant_details', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('alias')->nullable();
            $table->integer('variant_id')->unsigned();
            $table->foreign('variant_id')->references('id')->on('variants')->onDelete('cascade');
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
        Schema::dropIfExists('variant_details');
        Schema::dropIfExists('variants');
    }
}

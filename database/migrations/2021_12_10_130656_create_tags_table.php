<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('tags');
            $table->timestamps();
        });

        Schema::create('tag_details', function (Blueprint $table) {
            $table->id();
            $table->integer('tags_id')->unsigned();
            $table->foreign('tags_id')->references('id')->on('tags')->onDelete('cascade');
            $table->integer('items_id')->unsigned();
            $table->foreign('items_id')->references('id')->on('items')->onDelete('cascade');
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
        Schema::dropIfExists('tag_details');
        Schema::dropIfExists('tags');
    }
}

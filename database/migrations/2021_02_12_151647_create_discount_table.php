<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discount', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->integer('status');
            $table->integer('discount_details_id');
            $table->timestamp('expiry_at');
            $table->timestamps();
        });

        Schema::create('discount_details', function (Blueprint $table){
            $table->id();
            $table->string('type');
            $table->string('category');
            $table->string('coupon_code')->nullable();
            $table->double('value');
            $table->string('min_req_category')->nullable();
            $table->string('min_req_value')->nullable();
            $table->string('usage')->nullable();
            $table->integer('discount_id')->unsigned();
            $table->foreign('discount_id')->references('id')->on('discount')->onDelete('cascade');
            $table->integer('items_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discount_details');
        Schema::dropIfExists('discount');
    }
}

<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $now = Carbon::now('GMT+8')->toDateTimeString();
        $items = array(
            array('name'=>'Yamaha Guitar M-500', 'desc'=>'1st Guitar Made From Malaysia','category_id'=>1,
            'price'=>12,'discount_price'=>null,'sku'=>'YAMAHA-M500', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),

            array('name'=>'Tefal Cooker', 'desc'=>'1st Cooker Made From Malaysia','category_id'=>2,
            'price'=>12,'discount_price'=>null,'sku'=>'TEFAL-001', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),

            array('name'=>'Puma Shirt', 'desc'=>'1st Cooker Made From Malaysia','category_id'=>5,
            'price'=>15,'discount_price'=>null,'sku'=>'PUMA-001', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),

            array('name'=>'Bottle Eplas', 'desc'=>'Bottle Made From Eplas','category_id'=>2,
            'price'=>17,'discount_price'=>null,'sku'=>'EPLAS-001', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),

            array('name'=>'Asus ROG Headset X', 'desc'=>'1st Headset Made From Malaysia','category_id'=>2,
            'price'=>90,'discount_price'=>null,'sku'=>'ASUS-ROG-001', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),

            array('name'=>'Huawei Nova 2i', 'desc'=>'Its A Green Phone','category_id'=>2,
            'price'=>12,'discount_price'=>null,'sku'=>'HUAWEI-NOVA-001', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),

            array('name'=>'Iphone X', 'desc'=>'Its A Iphone','category_id'=>2,
            'price'=>12,'discount_price'=>null,'sku'=>'IPHONE-001', 'img'=>'none','status'=>'active','created_at'=>$now,'updated_at'=>$now),
        );

        DB::table('items')->insert($items);
    }
}

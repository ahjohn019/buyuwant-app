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
            'price'=>12,'color'=>'none', 'img'=>'null','status'=>'active','created_at'=>$now,'updated_at'=>$now),
            array('name'=>'Tefal Cooker', 'desc'=>'1st Cooker Made From Malaysia','category_id'=>2,
            'price'=>12,'color'=>'none', 'img'=>'null','status'=>'active','created_at'=>$now,'updated_at'=>$now),
        );

        DB::table('items')->insert($items);
    }
}

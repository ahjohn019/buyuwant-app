<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('GMT+8')->toDateTimeString();

        $data = array(
            array('name'=>'Music', 'alias'=>'music','img'=>'guitar-prod.svg', 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Appliances', 'alias'=>'appliances','img'=>'cooker.svg', 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Sports', 'alias'=>'sports','img'=>'football.png', 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Groceries', 'alias'=>'groceries','img'=>'groceries.svg', 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Clothes', 'alias'=>'clothes','img'=>'old-clothes.svg', 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Home Living', 'alias'=>'home_living','img'=>'sofa.png', 'created_at'=> $now, 'updated_at'=> $now),
        );

        DB::table('categories')->insert($data);
    }
}

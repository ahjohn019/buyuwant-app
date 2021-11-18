<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AttributeDetailsSeeder extends Seeder
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
            array('name'=>'Red','attribute_id'=>1, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Blue','attribute_id'=>1, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'XL','attribute_id'=>2, 'created_at'=> $now, 'updated_at'=> $now)
        );

        DB::table('attribute_details')->insert($data);
    }
}

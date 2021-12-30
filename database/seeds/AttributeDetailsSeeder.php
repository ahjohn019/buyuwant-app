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
            array('name'=>'Red', 'alias'=>'bg-red-400','variant_id'=>1, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Blue','alias'=>'bg-blue-400','variant_id'=>1, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Large','alias'=>'L','variant_id'=>2, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Medium','alias'=>'M','variant_id'=>2, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Small','alias'=>'S','variant_id'=>2, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Black','alias'=>'bg-black','variant_id'=>3, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'White','alias'=>'bg-white','variant_id'=>3, 'created_at'=> $now, 'updated_at'=> $now)
        );

        DB::table('variant_details')->insert($data);
    }
}

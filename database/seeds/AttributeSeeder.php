<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AttributeSeeder extends Seeder
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
            array('name'=>'Color','items_id'=>1, 'created_at'=> $now, 'updated_at'=> $now),
            array('name'=>'Size','items_id'=>1, 'created_at'=> $now, 'updated_at'=> $now)
        );

        DB::table('attributes')->insert($data);
    }
}

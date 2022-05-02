<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;


class AddressSeeder extends Seeder
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
            array('id'=>1, 'address_line'=>'332 jalan e4 taman melati','state'=>'Selangor', 'country'=> 'Malaysia', 'phone_number'=>'0192140561','postcode'=>53100,'user_id'=>1, 'created_at'=> $now, 'updated_at'=> $now),
            array('id'=>2, 'address_line'=>'311 jalan e3 taman melawati','state'=>'Selangor', 'country'=> 'Malaysia','phone_number'=>'0123771428','postcode'=>53100,'user_id'=>2, 'created_at'=> $now, 'updated_at'=> $now)
        );

        DB::table('address')->insert($data);
    }
}

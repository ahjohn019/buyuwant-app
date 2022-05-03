<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
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
        $data = array(
            array(
                'name'=>'Yew Rui','email'=>'yewrui@hotmail.com',
                'gender'=>'male','dob'=>'19/2/1995',
                'phone_number'=>'0123771428','stripe_id'=>'cus_KhGjFjqQRltMjx','password'=>Hash::make('123123'),'address_id'=>1,
                'created_at'=> $now, 'updated_at'=> $now
            ),
            array(
                'name'=>'Admin1','email'=>'admin1@hotmail.com',
                'gender'=>'male','dob'=>'19/2/1995',
                'phone_number'=>'0123771428','stripe_id'=>null,'password'=>Hash::make('123123'),'address_id'=>2,
                'created_at'=> $now, 'updated_at'=> $now
            )
        );

        DB::table('users')->insert($data);
    }
}

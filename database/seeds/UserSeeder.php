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
                'phone_number'=>'0123771428','password'=>Hash::make('123123'),
                'created_at'=> $now, 'updated_at'=> $now
            )
        );

        DB::table('users')->insert($data);
    }
}

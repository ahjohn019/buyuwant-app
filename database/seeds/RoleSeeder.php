<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RoleSeeder extends Seeder
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
        $role = array(
            array("name"=>"customer","user_id"=>1,'created_at'=> $now, 'updated_at'=> $now),
            array("name"=>"admin","user_id"=>2,'created_at'=> $now, 'updated_at'=> $now)
        );

        DB::table('user_groups')->insert($role);
    }
}

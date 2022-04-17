<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DiscountSeeder extends Seeder
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
        $discount = 
            array(
                array(
                    'name'=>'Black Friday March Sales',
                    'description'=>'lorem ipsum',
                    'status'=>1, 
                    'expiry_at'=>Carbon::now()->addMonths(1),
                    'discount_details_id'=>1,
                    'created_at'=>$now,
                    'updated_at'=>$now
                ),
                array(
                    'name'=>'Coupon Madness March',
                    'description'=>'lorem ipsum',
                    'status'=>1, 
                    'expiry_at'=>Carbon::now()->addMonths(1),
                    'discount_details_id'=>2,
                    'created_at'=>$now,
                    'updated_at'=>$now
                )
            );

        $discount_details = 
            array(
                array(
                    'type'=>'fixed',
                    'category'=>'auto',
                    'coupon_code'=>'',
                    'value'=>5.00,
                    'min_req_category'=>'',
                    'min_req_value'=>'',
                    'usage'=>'',
                    'discount_id'=>1,
                    'items_id'=>1,
                ),
                array(
                    'type'=>'percentage',
                    'category'=>'auto',
                    'coupon_code'=>'',
                    'value'=>5.00,
                    'min_req_category'=>'',
                    'min_req_value'=>'',
                    'usage'=>'',
                    'discount_id'=>1,
                    'items_id'=> 2,
                ),
                array(
                    'type'=>'percentage',
                    'category'=>'coupon',
                    'coupon_code'=>'TEST5',
                    'value'=>5.00,
                    'min_req_category'=>'',
                    'min_req_value'=>'',
                    'usage'=>'',
                    'discount_id'=>2,
                    'items_id'=> null,
                )
            );
        
        DB::table('discount')->insert($discount);
        DB::table('discount_details')->insert($discount_details);
    }   
}

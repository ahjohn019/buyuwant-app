<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TagsSeeder extends Seeder
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
        $dataone = array(
            array(
                'tags'=>'Trending','created_at'=>$now,'updated_at'=>$now
            ),
            array(
                'tags'=>'Latest','created_at'=>$now,'updated_at'=>$now
            )
        );
        $datatwo = array(
            array(
                'tags_id'=>1,'items_id'=>1,'created_at'=>$now,'updated_at'=>$now
            ),
            array(
                'tags_id'=>2,'items_id'=>1,'created_at'=>$now,'updated_at'=>$now
            ),
            array(
                'tags_id'=>1,'items_id'=>2,'created_at'=>$now,'updated_at'=>$now
            )
        );
        DB::table('tags')->insert($dataone);
        DB::table('tag_details')->insert($datatwo);
    }
}

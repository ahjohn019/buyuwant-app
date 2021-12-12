<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TagDetails extends Model
{
    //
    protected $fillable = ['tags_id','items_id'];

    protected $with = ['tags','tagOneItem'];

    public function tags(){
        return $this->belongsTo('App\Tags','tags_id','id')->without('tag_details');
    }

    public function tagOneItem(){
        return $this->belongsTo('App\Items','items_id','id')->without('tag_details');
    }

}

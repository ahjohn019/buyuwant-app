<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags;
use App\Models\Items;

class TagDetails extends Model
{
    //
    protected $fillable = ['tags_id','items_id'];

    protected $with = ['tags','tagOneItem'];

    public function tags(){
        return $this->belongsTo(Tags::class,'tags_id','id')->without('tag_details');
    }

    public function tagOneItem(){
        return $this->belongsTo(Items::class,'items_id','id')->without('tag_details');
    }

}

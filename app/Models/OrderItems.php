<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Items;

class OrderItems extends Model
{
    //
    protected $fillable = ['order_id','items_id','quantity','amount','status','variant_details'];

    protected $with = ['orderItems'];
    
    public function orderItems(){
        return $this->belongsTo(Items::class,'items_id','id');
    }
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Items;

class OrderItems extends Model
{
    //
    protected $fillable = ['order_id','items_id','quantity','amount','status'];

    protected $with = ['orderItems'];


    // public function orderItems(){
    //     return $this->hasOne('App\OrderItems',['order_id','items_id']);
    // }
    
    public function orderItems(){
        return $this->belongsTo(Items::class,'items_id','id');
    }
    
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    //
    protected $fillable = ['order_id','items_id','quantity','amount','status'];

    public function orderItems(){
        return $this->hasOne('App\OrderItems',['order_id','items_id']);
    }

    
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    //
    protected $fillable = ['user_id','amount','status'];

    protected $with = ['ordersItems','orderUser'];

    public function orderUser()
    {
        return $this->belongsTo('App\User','user_id','id');
    }

    public function ordersItems(){
        return $this->hasMany('App\OrderItems', 'order_id');
    }
}

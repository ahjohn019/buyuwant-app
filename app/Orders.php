<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    //
    protected $fillable = ['user_id','amount','status'];

    protected $with = ['ordersItems'];

    public function orders()
    {
        return $this->hasOne('App\Orders','user_id');
    }

    public function ordersItems(){
        return $this->hasMany('App\OrderItems', 'order_id');
    }
}

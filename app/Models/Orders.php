<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\OrderItems;

class Orders extends Model
{
    //
    protected $fillable = ['user_id','amount','status'];

    protected $with = ['ordersItems','orderUser'];

    public function orderUser()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function ordersItems(){
        return $this->hasMany(OrderItems::class, 'order_id');
    }
}

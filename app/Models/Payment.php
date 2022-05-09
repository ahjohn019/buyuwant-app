<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payment';

    protected $fillable = ['type','provider','transaction_id','status','order_id','user_id'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    // public function order(){
    //     return $this->belongsTo(Order::class,'order_id','id');
    // }
}

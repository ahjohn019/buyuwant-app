<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    //
    protected $fillable = ['user_id','amount','status'];

    public function orders()
    {
        return $this->hasOne('App\Orders','user_id');
    }
}

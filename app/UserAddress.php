<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    //
    protected $fillable = ['user_id','address_line','state','country','phone_number','postcode'];

    public function user_addr()
    {
        return $this->hasOne('App\User','user_id');
    }
}

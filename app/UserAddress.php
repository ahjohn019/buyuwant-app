<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    //
    protected $fillable = ['address_line','state','country','phone_number','postcode','user_id'];

    // protected $with = ['userAddr'];

    // public function userAddr()
    // {
    //     return $this->belongsTo('App\User','user_id','id');
    // }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Address extends Model
{

    protected $table = 'address';

    protected $fillable = ['address_line','state','country','phone_number','postcode','user_id'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
 
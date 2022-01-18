<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'user_groups';

    protected $fillable = ['name','user_id'];

    // protected $with = ['userDetails'];

    // public function userDetails(){
    //     return $this->belongsTo(User::class,'user_id','id');
    // }

}

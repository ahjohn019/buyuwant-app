<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    //
    protected $fillable = [
        'name', 'desc','category_id','price','color','img','status'
    ];

    public function categories()
    {
        return $this->hasOne('App\Categories');
    }
}

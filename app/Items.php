<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    //
    protected $fillable = [
        'name', 'desc','category_id','price','color','img','status'
    ];

    protected $with = ['categories'];

    public function categories()
    {
        return $this->belongsTo('App\Categories','category_id','id');
    }
}

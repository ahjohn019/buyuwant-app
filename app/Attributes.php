<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attributes extends Model
{
    //
    protected $fillable = ['name','items_id'];

    protected $with = ['items'];

    public function items()
    {
        return $this->belongsTo('App\Items','items_id','id');
    }
}

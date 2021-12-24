<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Items;

class Attributes extends Model
{
    //
    protected $fillable = ['name','items_id'];

    protected $with = ['items'];

    public function items()
    {
        return $this->belongsTo(Items::class,'items_id','id');
    }
}

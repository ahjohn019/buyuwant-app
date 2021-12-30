<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Items;

class Variants extends Model
{
    //
    protected $table = 'variants';

    protected $fillable = ['name','items_id'];

    protected $with = ['items'];

    public function items()
    {
        return $this->belongsTo(Items::class,'items_id','id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Categories;

class Items extends Model
{
    //
    protected $fillable = [
        'name', 'desc','category_id','price','color','img','status'
    ];

    protected $with = ['categories'];

    public function categories()
    {
        return $this->belongsTo(Categories::class,'category_id','id');
    }
}

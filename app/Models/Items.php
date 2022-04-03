<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Categories;
use App\Models\DiscountDetails;

class Items extends Model
{
    //
    protected $fillable = [
        'name', 'desc','price','discount_price','sku','color','img','status','category_id'
    ];

    protected $with = ['categories'];

    public function categories()
    {
        return $this->belongsTo(Categories::class,'category_id','id');
    }
}

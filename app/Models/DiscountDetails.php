<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Discount;
use App\Models\Items;
use App\Models\Category;

class DiscountDetails extends Model
{
    use HasFactory;

    protected $table = 'discount_details';

    protected $fillable = ['type','category', 'coupon_code','value','applied','min_req_category','min_req_value','usage','discount_id','items_id','category_id'];

    protected $with = ['discount'];

    public function discount(){
        return $this->belongsTo(Discount::class,'discount_id','id');
    }

    public function items(){
        return $this->belongsTo(Items::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}

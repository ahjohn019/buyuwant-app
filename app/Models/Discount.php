<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DiscountDetails;

class Discount extends Model
{
    use HasFactory;

    protected $table = 'discount';

    protected $fillable = [
        'name','description', 'status', 'expiry_at', 'discount_details_id'
    ];
    
    public function discount_details(){
        return $this->hasMany(DiscountDetails::class);
    }
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Items;
use App\Models\User;

class Cart extends Model
{
    //
    protected $table = 'shopping_carts';

    protected $fillable = ['user_id','items_id','quantity'];

    protected $with = ['items','user'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function items()
    {
        return $this->belongsTo(Items::class, 'items_id');
    }
}

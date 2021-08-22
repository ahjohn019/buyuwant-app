<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Items;
use App\User;

class Cart extends Model
{
    //
    protected $table = 'shopping_carts';

    protected $fillable = ['user_id','items_id','quantity'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function items()
    {
        return $this->belongsTo(Items::class, 'items_id');
    }
}

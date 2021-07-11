<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    //
    protected $fillable = [
        'name', 'alias','img','created_at', 'updated_at'
    ];
}

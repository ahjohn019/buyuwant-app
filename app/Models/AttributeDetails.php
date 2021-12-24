<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeDetails extends Model
{
    //
    protected $fillable = ['name','attribute_id'];

    protected $with = ['attributes'];

    public function attributes()
    {
        return $this->belongsTo('App\Attributes','attribute_id','id');
    }
}

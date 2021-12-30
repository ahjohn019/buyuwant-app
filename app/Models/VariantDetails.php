<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Variants;

class VariantDetails extends Model
{
    //
    protected $table = 'variant_details';

    protected $fillable = ['name','alias','variant_id'];

    protected $with = ['variants'];

    public function variants()
    {
        return $this->belongsTo(Variants::class,'variant_id','id');
    }
}

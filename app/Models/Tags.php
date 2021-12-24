<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\TagDetails;

class Tags extends Model
{
    //
    protected $fillable = ['tags'];

    protected $with = ['tagManyItems'];

    public function tagManyItems(){
        return $this->hasMany(TagDetails::class,'tags_id')->without('tags');
    }
}

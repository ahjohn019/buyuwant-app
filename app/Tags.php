<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    //
    protected $fillable = ['tags'];

    protected $with = ['tagManyItems'];

    public function tagManyItems(){
        return $this->hasMany('App\TagDetails','tags_id')->without('tags');
    }
}

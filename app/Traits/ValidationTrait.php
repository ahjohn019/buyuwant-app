<?php


namespace App\Traits;

use Illuminate\Http\Request;
use Validator;

trait ValidationTrait {

    public function validation(Request $request, $validationList){
        $validator = Validator::make($request->all(), $validationList);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }
    }
}
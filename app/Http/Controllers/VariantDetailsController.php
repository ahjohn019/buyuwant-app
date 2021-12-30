<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VariantDetails;
use Validator;

class VariantDetailsController extends Controller
{
    //
    public function index(){
        $attrDetailsIndex= VariantDetails::all();
        return response()->json(['variant_details'=> $attrDetailsIndex], 200);
    }

    public function store(Request $request)
    {
        //store Variant data 
        $request->validate([
            'name' => 'required',
            'variant_id' => 'required'
        ]);
        
        $variant_details = VariantDetails::create($request->all());
        
        return response()->json(['message'=> 'Variant Details created', 
        'Data' => $variant_details]);
    }

    public function show(VariantDetails $id){
        return $id;
    }

    public function update(Request $request, VariantDetails $id)
    {
        $id->update($request->all());

        return response()->json([
            'message' => 'Variant details updated!',
            'variant_id' => $id
        ]);
    }

    public function destroy(VariantDetails $id)
    {
        $variant_details->delete();
        return response()->json([
            'message' => 'Variant details deleted'
        ]);
    }
}

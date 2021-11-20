<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AttributeDetails;
use Validator;

class AttributeDetailsController extends Controller
{
    //
    public function index(){
        $attrDetailsIndex= AttributeDetails::all();
        return response()->json(['attribute_details'=> $attrDetailsIndex], 200);
    }

    public function store(Request $request)
    {
        //store attributes data 
        $request->validate([
            'name' => 'required',
            'attribute_id' => 'required'
        ]);
        
        $attributes_details = AttributeDetails::create($request->all());
        
        return response()->json(['message'=> 'Attributes Details created', 
        'Data' => $attributes_details]);
    }

    public function show(AttributeDetails $id){
        return $id;
    }

    public function update(Request $request, AttributeDetails $id)
    {
        $id->update($request->all());

        return response()->json([
            'message' => 'attributes details updated!',
            'attribute_id' => $id
        ]);
    }

    public function destroy(AttributeDetails $id)
    {
        $attributes_details->delete();
        return response()->json([
            'message' => 'attributes details deleted'
        ]);
    }
}

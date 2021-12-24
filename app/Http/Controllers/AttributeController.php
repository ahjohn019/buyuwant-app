<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attributes;
use Validator;

class AttributeController extends Controller
{
    //

    public function index(){
        $attrIndex= Attributes::all();
        return response()->json(['attributes'=> $attrIndex], 200);
    }

    public function store(Request $request)
    {
        //store category data 
        $request->validate([
            'name' => 'required',
            'items_id' => 'required'
        ]);
        $attributes = Attributes::create($request->all());
        
        return response()->json(['message'=> 'Attributes created', 
        'Data' => $attributes]);
    }

    public function show(Attributes $id){
        return $id;
    }

    public function update(Request $request, Attributes $id)
    {
        $id->update($request->all());

        return response()->json([
            'message' => 'attributes updated!',
            'attributes' => $id
        ]);
    }

    public function destroy(Attributes $id)
    {
        $attributes->delete();
        return response()->json([
            'message' => 'attributes deleted'
        ]);
    }
}

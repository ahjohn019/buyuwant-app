<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Variants;
use Validator;

class VariantController extends Controller
{
    //
    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show']]);
    }


    public function index(){
        $variantIndex= Variants::all();
        return response()->json(['variants'=> $variantIndex], 200);
    }

    public function store(Request $request)
    {
        //store category data 
        $request->validate([
            'name' => 'required',
            'items_id' => 'required'
        ]);
        $variants = Variants::create($request->all());
        
        return response()->json(['message'=> 'variants created', 
        'Data' => $variants]);
    }

    public function show(Variants $id){
        return $id;
    }

    public function update(Request $request, Variants $id)
    {
        $id->update($request->all());

        return response()->json([
            'message' => 'variants updated!',
            'variants' => $id
        ]);
    }

    public function destroy(Variants $id)
    {
        $variants->delete();
        return response()->json([
            'message' => 'variants deleted'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Items;
use Carbon\Carbon;
use App\Models\User;
use Validator;

class ItemsController extends Controller
{
    
    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show','filterItemCategory','paginateTest']]);
    }

    public function index(){
        $itemIndex= Items::all();
        return response()->json(['items'=> $itemIndex], 200);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'desc' => 'required',
            'price' => 'required',
            'sku' => 'required',
            'img' => 'required',
            'status' => 'required',
            'category_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $items = Items::create($request->all());
        
        return response()->json(['message'=>'Items created','data' => $items]);
    }

    public function show(Items $id){
        return $id;
    }

    public function update(Request $request, Items $id){

        $id->update($request->all());

        return response()->json([
            'message' => 'items updated!',
            'items' => $id
        ]);
    }

    public function destroy(Items $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'items deleted'
        ]);
    }

    public function filterItemCategory($id){
        $filterCategory = Items::where('category_id', $id)->get();
        return response()->json(['categoryFilter'=>$filterCategory], 200);
    }

    public function paginateTest($id){
        $filterPaginate = Items::where('category_id', $id)->paginate(4);
        return response()->json(['categoryPaginate'=>$filterPaginate], 200);
    }

    
}

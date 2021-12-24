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
        $this->middleware('auth:api',['except'=>['index','show','filterItemCategory']]);
    }

    public function index(){
        $itemIndex= Items::all();
        return response()->json(['items'=> $itemIndex], 200);
    }

    public function store(Request $request){

        $userIndex = auth()->user();
        $userArray = $userIndex->toArray();
        $userGroup = $userArray["group"];

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'desc' => 'required',
            'price' => 'required',
            'color' => 'required',
            'status' => 'required',
            'category_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if($userGroup === "admin"){
            $items = Items::create($request->all());
        } else {
            return response()->json(['message'=>'Only Admin Can Create'], 500);
        }
    
        return response()->json(['message'=>'Items created','data' => $items,'user'=>$userGroup]);
    }

    public function filterItemCategory($id){
        $filterCategory = Items::where('category_id', $id)->get();
        return response()->json(['categoryFilter'=>$filterCategory], 200);
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
}

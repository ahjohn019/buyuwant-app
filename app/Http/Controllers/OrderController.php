<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Orders;
use Validator;

class OrderController extends Controller
{
    //
    public function __construct(){
        $this->middleware('auth:api',['except'=>['index','show']]);
    }


    public function index(){
        $ordersIndex= Orders::all();
        return response()->json(['orders'=> $ordersIndex], 200);
    }

    public function store(Request $request){
        
        $validator = Validator::make($request->all(),[
            'user_id' => 'required',
            'amount' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $orders = Orders::create($request->all());
        return response()->json(['message'=>'Order created','data' => $orders]);
        
    }

    public function show(Orders $id){
        return $id;
    }

    public function update(Request $request, Orders $id){

        $id->update($request->all());

        return response()->json([
            'message' => 'orders updated!',
            'orders' => $id
        ]);
    }

    public function destroy(Items $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'orders deleted'
        ]);
    }

}

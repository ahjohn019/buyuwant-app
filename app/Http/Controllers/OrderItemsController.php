<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderItems;
use Validator;

class OrderItemsController extends Controller
{
    //
    public function __construct(){
        $this->middleware('auth:api',['except'=>['index','show']]);
    }

    public function index(){
        $ordersIndex= OrderItems::all();
        return response()->json(['orders'=> $ordersIndex], 200);
    }

    public function store(Request $request){
        
        $validator = Validator::make($request->all(),[
            'order_id' => 'required',
            'items_id' => 'required',
            'quantity' => 'required',
            'amount' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $orderItems = OrderItems::create($request->all());
        return response()->json(['message'=>'Order Items created','data' => $orderItems]);
        
    }

    public function show(OrderItems $id){
        return $id;
    }

    public function update(Request $request, OrderItems $id){

        $id->update($request->all());

        return response()->json([
            'message' => 'order items updated!',
            'orders' => $id
        ]);
    }

    public function destroy(OrderItems $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'orders deleted'
        ]);
    }


}

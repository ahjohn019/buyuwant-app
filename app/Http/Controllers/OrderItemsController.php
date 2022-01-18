<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderItems;
use App\Models\Orders;
use Validator;

class OrderItemsController extends Controller
{
    //
    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show','groupBy']]);
    }

    public function index(){
        $ordersIndex= OrderItems::all();
        return response()->json(['orders'=> $ordersIndex], 200);
    }

    public function groupBy(){
        $ordersTotalQtyCount= OrderItems::groupBy('order_id')
                    ->selectRaw("order_id, sum(quantity) as total_quantity" )
                    ->get();
        return response()->json(['orders'=> $ordersTotalQtyCount], 200);
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


        $orderItems = new OrderItems;
        $orderItems->order_id = $request->order_id;
        $orderItems->items_id = $request->items_id;
        $orderItems->quantity = $request->quantity;
        $orderItems->amount = $request->amount;
        $orderItems->total = $orderItems->quantity * $orderItems->amount;
        $orderItems->status = $request->status;
        $orderItems->save();

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

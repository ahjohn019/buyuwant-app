<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;
use App\Models\User;
use Validator;
use App\Models\OrderItems;

class OrderController extends Controller
{
    //
    protected $authUser;

    public function __construct(){
        $this->middleware('auth:api',['except'=>['index','show']]);
        $this->authUser = auth()->user();
    }

    public function index(){
        $ordersIndex= Orders::all();
        return response()->json(['orders'=> $ordersIndex], 200);
    }

    public function store(Request $request){
        $authArray = $this->authUser->toArray();
        
        $validator = Validator::make($request->all(),[
            'amount' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $orders = new Orders;
        $orders->user_id = $authArray['id'];
        $orders->amount = $request->amount;
        $orders->status = $request->status;
        $orders->save();

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

    public function destroy(Orders $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'orders deleted'
        ]);
    }

}

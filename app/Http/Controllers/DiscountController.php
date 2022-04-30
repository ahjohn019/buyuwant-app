<?php

namespace App\Http\Controllers;

use Validator;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Items;
use App\Models\Discount;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\DiscountDetails;
use Illuminate\Support\Facades\Auth;


class DiscountController extends Controller
{
    //
    const COUPON_DISABLED = 0;
    const DISCOUNT_DETAILS_ENABLED = 1;

    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show']]);
    }    

    public function index(){
        $discountIndex = Discount::all();
        foreach ($discountIndex as $discount){
            $discount_details [] = $discount->discount_details;
        }
        return response()->json(['message'=>'Discount','data' => $discountIndex],200);
    }

    public function discount_details(){
        $discountDetails = DiscountDetails::all();
        foreach ($discountDetails as $discount){
            $items [] = $discount->items;
        }
        return response()->json(['message'=>'Discount Details','data' => $discountDetails],200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'expiry_at' => 'required',
            'discount_details_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $discount = Discount::create($request->all());

        return response()->json(['message'=>'discount created','data'=>$discount]);

    }

    public function show (Discount $id){
        return $id;
    }

    public function show_details (DiscountDetails $id){
        return $id;
    }

    public function updateDiscountItem(Discount $id){
        $discount_details = $id->discount_details;
        $discountPrice = "";

        foreach($discount_details as $details){
            $getItem = Items::where('id',$details->items_id);
            $getItemDetails = $getItem->get();

            foreach($getItemDetails as $item){
                $convertDiscountFormat = discountItem((float)$item->price, $details->type, (float)$details->value);
            }

            $getItem->update(['discount_price'=> $convertDiscountFormat]);
            return $convertDiscountFormat;
        }
    }

    public function update(Request $request, Discount $id){
        $id->update($request->all());
        $this->updateDiscountItem($id);

        return response()->json([
            'message' => 'discount updated!',
            'discount' => $id
        ]);
    }

    public function update_details(Request $request, DiscountDetails $id){
        $id->update($request->all());

        return response()->json([
            'message' => 'discount details updated!',
            'discount_details' => $id
        ]);
    }

    public function toggle_discount(Request $request, Discount $id){
        $id->update($request->all());
        $discount_details = $id->discount_details->where('category','auto');
        $discountPrice = null;

        foreach($discount_details as $details){
            if($id->status == self::DISCOUNT_DETAILS_ENABLED || $id->expiry_at <= Carbon::now()){
                $discountPrice = $this->updateDiscountItem($id);
            } 
            
            Items::where('id',$details->items_id)->update(['discount_price'=> $discountPrice]);
        }

        return response()->json([
            'message' => 'Toggle updated!',
            'toggle_discount' => $id
        ]);
    }

    public function destroy(Discount $id){
        $id->delete();

        return response()->json([
            'message' => 'discount deleted'
        ]);
    }

    public function coupon_conditions($coupon_code){
        $discount_list = Discount::where('status', '=', 1)->get();
        $check_coupon_status = null;

        foreach ($discount_list as $discount) {
            $match_input_query = $discount->discount_details->where('coupon_code', $coupon_code)->first();

            if(!empty($match_input_query)){
                $coupon_name = $match_input_query->discount->name;
                $discount_price = couponSelection($match_input_query->value, $match_input_query->type);
                $check_coupon_status = ["coupon_name"=> $coupon_name, 'discount_price' => $discount_price];
            } 
        }
 
        if(empty($check_coupon_status)){
            return null;
        }

        $condition = new \Darryldecode\Cart\CartCondition(array(
            'name' => $check_coupon_status['coupon_name'],
            'type' => 'tax',
            'target' => 'subtotal', 
            'value' => '-' . $check_coupon_status['discount_price']
        ));

        return $condition;

    }
    
    public function coupon_activate(Request $request){
        $input_coupon_code = $request->input('coupon_code');
        $input_coupon_status = $request->input('coupon_status');
        $coupon_conditions = $this->coupon_conditions($input_coupon_code);

        if(empty($coupon_conditions)){
            return response()->json(['message'=>'Coupon Not Exist'],422);
        }

        if($input_coupon_status == self::COUPON_DISABLED){
            \Cart::session(Auth::id())->clearCartConditions($coupon_conditions); 
            return response()->json(['message'=>'Disable Coupon Success'],200);    
        } 

        \Cart::session(Auth::id())->condition($coupon_conditions); 
        return response()->json(['message'=>'Activate Success'],200);   
        
    }

}


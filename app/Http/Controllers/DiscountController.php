<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;
use App\Models\DiscountDetails;
use App\Models\Items;
use Carbon\Carbon;
use Validator;


class DiscountController extends Controller
{
    //
    protected $authUser;

    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show']]);
        $this->authUser = auth()->user();
    }    

    public function index(){
        $discountIndex = Discount::all();
        foreach ($discountIndex as $discount){
            $discount_details [] = $discount->discount_details;
        }
        return response()->json(['message'=>'Discount','data' => $discountIndex],200);
    }

    public function discountDetails(){
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
            'expiry_at' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $discount = new Discount;
        $discount->name = $request->name;
        $discount->description = $request->description;
        $discount->status = $request->status;
        $discount->expiry_at = $request->expiry_at;
        $discount->save();

        return response()->json(['message'=>'discount created','data'=>$discount]);

    }

    public function show (Discount $id){
        return $id;
    }

    public function showDetails (DiscountDetails $id){
        return $id;
    }

    public function updateDiscountItem(Discount $id){
        $discount_details = $id->discount_details;
        $discountPrice = "";

        foreach($discount_details as $details){
            $getItem = Items::where('id',$details->items_id);
            $getItemDetails = $getItem->get();

            foreach($getItemDetails as $item){
                if($details->type == 'fixed'){
                    $discountPrice = (float)$item->price - (float)$details->value;
                } else {
                    $discountPrice = (100 - (float)$details->value) / 100 * (float)$item->price;
                }
                $convertDiscountFormat = number_format($discountPrice, 2, '.', ' ');
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

    public function updateDetails(Request $request, DiscountDetails $id){
        $id->update($request->all());

        return response()->json([
            'message' => 'discount details updated!',
            'discount_details' => $id
        ]);
    }

    public function toggleDiscount(Request $request, Discount $id){
        $id->update($request->all());
        $discount_details = $id->discount_details;
        $discountPrice = "";

        foreach($discount_details as $details){
            if($id->status == 1 && $details->category == "auto" || $id->expiry_at <= Carbon::now()){
                $discountPrice = $this->updateDiscountItem($id);
            } else {
                $discountPrice = null;
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
    
}


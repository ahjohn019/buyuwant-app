<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;
use App\Models\Items;
use App\Models\User;
use Validator;
use App\Models\Discount;

class CartController extends Controller
{
    protected $authUser;

    public function __construct(){
        $this->middleware('auth:api');
        $this->authUser = auth()->user();
        $this->authArray = $this->authUser->toArray();
        $this->cartSession = \Cart::session($this->authArray['id']);
    }

    //session cart test
    //View Cart
    public function viewCartSession(){
      $items_content = $this->cartSession->getContent();
      $subtotal = $this->cartSession->getSubTotal();
      $subtotalTax = ($subtotal * 0.06) + $subtotal;
      $subtotalFinalTax = number_format($subtotalTax, 2, '.', ' ');

      return response()->json(['success' => 1, 'message' => 'Display Cart Successfully', 'data' => $items_content,'user'=>$this->authArray['id'], 'subtotal'=>$subtotal,'subtotalWithTax'=>$subtotalFinalTax], 200);
    }

    //Add Cart
    public function addCartSession(Request $request){
      $items_id = $request->items_id;
      $qty = (int)$request->quantity;
      $variant = $request->input('variant');
      $items = Items::find($request->input('items_id'));
      

      $items_cart_list = array(
          'id' => $items->id,
          'name' => $items->name,
          'price' => isset($items->discount_price) ? $items->discount_price : $items->price,
          'quantity' => $qty,
          'attributes' => array(
            'original_price' => $items->price,
            'total' => isset($items->discount_price) ? ($items->discount_price * $qty) : ($items->price * $qty),
            'variant' => $variant,
            'img' => $items->img
          )
      );

      $check_cartEmpty = $this->cartSession->isEmpty();
      $items_content = $this->cartSession->getContent($items->id);
      $subtotal = $this->cartSession->getSubTotal();

      //if item doesn't exist display error messages
      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      // If first Items was inserted on cart if cart was totally empty
      if($check_cartEmpty == true || empty($items_content[$items_id]['id'])){        
            $this->cartSession->add($items_cart_list);
            return response()->json(['success' => 1, 'message' => 'Cart Inserted','data' => $items_content,'subtotal' => $subtotal], 200);
      } 
      else {
            $items_content[$items_id]['quantity'] += $qty;
            $this->cartSession->update($items_id,array(
              'quantity' => array(
                'relative' => false, 
                'value' => $items_content[$items_id]['quantity'] ),
              'attributes' => array(
                'total'=> $items_content[$items_id]['quantity'] * $items_content[$items_id]['price'],
                'variant' => $variant, 
                'img' =>$items->img
              )
            ));
      }

      return response()->json(['success' => 1, 'message' => 'Cart Updated','data' => $items_content,'subtotal' => $subtotal], 200);
    }

    //Update Specific Items
    public function updateItemSession(Request $request){
      $items_id = $request->items_id;
      $qty = (int)$request->quantity;
      $items = Items::find($request->input('items_id'));
      
      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      $items_content = $this->cartSession->getContent($items->id);

      $this->cartSession->update($items_id,array(
        'quantity' => array('relative' => false, 'value' => $qty ),
        'attributes' => array(
          'original_price' => $items_content[$items_id]['attributes']['original_price'],
          'total'=> $qty * $items_content[$items_id]['price'],
          'variant' => $items_content[$items_id]['attributes']['variant'],
          'img' =>$items->img
          )
      ));

      return response()->json(['success' => 1, 'message' => 'Session items qty updated','data'=>$items_content[$items_id]], 200);
    }

    //Delete Specific Items
    public function deleteItemsSession(Request $request){
      $items_id = $request->items_id;
      $items = Items::find($request->input('items_id'));

      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      $this->cartSession->remove($items_id);
      return response()->json(['success' => 1, 'message' => 'Session items Deleted'], 200);
    }


    //Clear All Cart Items
    public function clearCartSession(Request $request) {
      $this->cartSession->clear();
      return response()->json(['success' => 1, 'message' => 'Clear All Cart'], 200);
    }

    //Activate Coupon
    public function activateCoupon(Request $request){
      $items_content = $this->cartSession->getContent();
      $items_getSubtotal = $this->cartSession->getSubtotal();
      $input_coupon_code = $request->input('coupon_code');
      $discount_list = Discount::all();
      $discountPrice = "";

      if(!$items_content){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      foreach($discount_list as $discount){
        foreach($discount->discount_details as $detail){
          if($input_coupon_code == $detail->coupon_code && $detail->discount->status == 1){
              //fixed
              if($detail->type == 'fixed'){
                $discountPrice = (float)$items_getSubtotal - (float)$detail->value;
              }
              //percentage
              if($detail->type == 'percentage'){
                $discountPrice = (100 - (float)$detail->value) / 100 * (float)$items_getSubtotal;
              }
          } 
        }
      }

      if(empty($discountPrice)){
         return response()->json(['success' => 0, 'message' => 'Invalid Coupon'], 404);
      }

      $convertSubtotal = number_format($discountPrice, 2, '.', ' ');

      return response()->json(['success' => 0, 'discount_price' => $convertSubtotal, 'message' => 'Coupon Matched'], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Cart;
use App\Items;
use App\User;
use Validator;

class CartController extends Controller
{
    protected $authUser;

    public function __construct(){
        $this->middleware('auth:api');
        $this->authUser = auth()->user();
    }

    //session cart test
    //View Cart
    public function viewCartSession(){
      $authArray = $this->authUser->toArray();
      $items_content = \Cart::session($authArray['id'])->getContent();
      $subtotal = \Cart::session($authArray['id'])->getSubTotal();
      $subtotalWithoutTax = round(((100-6) / 100) * $subtotal);
      $subtotalWithTax = round($subtotal, 2);

      return response()->json(['success' => 1, 'message' => 'Display Cart Successfully', 'data' => $items_content,'user'=>$authArray['id'], 'subtotal'=>$subtotalWithoutTax, 'subtotalWithTax'=>$subtotalWithTax], 200);
    }

    //Add Cart
    public function addCartSession(Request $request){
      $authArray = $this->authUser->toArray();
      $items_id = $request->items_id;
      $qty = (int)$request->quantity;
      
      $items = Items::find($request->input('items_id'));

      $gstTaxConditions = new \Darryldecode\Cart\CartCondition(array(
        'name' => 'GST 6%',
        'type' => 'tax',
        'value' => '6%'
      ));

      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      $check_cartEmpty = \Cart::session($authArray['id'])->isEmpty();

      if($check_cartEmpty == true){        
        \Cart::session($authArray['id'])->add(array(
          'id' => $items->id,
          'name' => $items->name,
          'price' => $items->price,
          'quantity' => $qty,
          'attributes' => array(
            'total' => $items->price * $qty
          ),
          'conditions' => $gstTaxConditions
        ));
        $items_content = \Cart::session($authArray['id'])->getContent($items->id);
        $subtotal = \Cart::session($authArray['id'])->getSubTotal();
        return response()->json(['success' => 1, 'message' => 'Cart Inserted','data' => $items_content,'subtotal' => $subtotal], 200);
      }

      $items_content = \Cart::session($authArray['id'])->getContent($items->id);

      if(isset($items_content[$items_id]['id'])){
        $items_content[$items_id]['quantity'] += $qty;
        \Cart::session($authArray['id'])->update($items_id,array(
          'quantity' => array('relative' => false, 'value' => $items_content[$items_id]['quantity'] ),
          'attributes' => array('total'=> $items_content[$items_id]['quantity'] * $items_content[$items_id]['price']),
          'conditions' => $gstTaxConditions
        ));
      } else {
        \Cart::session($authArray['id'])->add(array(
          'id' => $items->id,
          'name' => $items->name,
          'price' => $items->price,
          'quantity' => $qty,
          'attributes' => array(
            'total' => $items->price * $qty
          ),
          'conditions' => $gstTaxConditions
        ));
        $items_content = \Cart::session($authArray['id'])->getContent($items->id);
        $subtotal = \Cart::session($authArray['id'])->getSubTotal();
        return response()->json(['success' => 1, 'message' => 'Another Items Inserted','data' => $items_content,'subtotal' => $subtotal ], 200);
      }
      $subtotal = \Cart::session($authArray['id'])->getSubTotal();
      return response()->json(['success' => 1, 'message' => 'Cart Updated','data' => $items_content,'subtotal' => $subtotal], 200);
    }


    //Update Specific Items
    public function updateItemSession(Request $request){
      $authArray = $this->authUser->toArray();
      $items_id = $request->items_id;
      $qty = (int)$request->quantity;
      
      $items = Items::find($request->input('items_id'));
      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      $items_content = \Cart::session($authArray['id'])->getContent($items->id);

      $gstTaxConditions = new \Darryldecode\Cart\CartCondition(array(
        'name' => 'GST 6%',
        'type' => 'tax',
        'value' => '6%'
      ));

      \Cart::session($authArray['id'])->update($items_id,array(
        'quantity' => array('relative' => false, 'value' => $qty ),
        'attributes' => array('total'=> $qty * $items_content[$items_id]['price']),
        'conditions' => $gstTaxConditions
      ));

      return response()->json(['success' => 1, 'message' => 'Session items qty updated','newItemName'=>$items_content[$items_id]['name'],'newItemId'=>$items_id,'newQty'=> $qty, 'newPrice'=> $items_content[$items_id]['attributes']['total']], 200);
    }

    //Delete Specific Items
    public function deleteItemsSession(Request $request){
      $authArray = $this->authUser->toArray();
      $items_id = $request->items_id;
      
      $items = Items::find($request->input('items_id'));
      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      \Cart::session($authArray['id'])->remove($items_id);

      return response()->json(['success' => 1, 'message' => 'Session items Deleted'], 200);
    }


    //Clear All Cart Items
    public function clearCartSession(Request $request) {
      $authArray = $this->authUser->toArray();
     \Cart::session($authArray['id'])->clear();
      return response()->json(['success' => 1, 'message' => 'Clear All Cart'], 200);
    }


}

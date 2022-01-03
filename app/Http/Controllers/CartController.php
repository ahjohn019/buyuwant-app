<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;
use App\Models\Items;
use App\Models\User;
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
      $subtotalTax = ($subtotal * 0.06) + $subtotal;
      $subtotalFinalTax = number_format($subtotalTax, 2, '.', ' ');

      return response()->json(['success' => 1, 'message' => 'Display Cart Successfully', 'data' => $items_content,'user'=>$authArray['id'], 'subtotal'=>$subtotal,'subtotalWithTax'=>$subtotalFinalTax], 200);
    }

    //Add Cart
    public function addCartSession(Request $request){
      $authArray = $this->authUser->toArray();
      $items_id = $request->items_id;
      $qty = (int)$request->quantity;
      $variant = $request->input('variant');
      $items = Items::find($request->input('items_id'));
      $cartSessionAuthentication = \Cart::session($authArray['id']);
     
      $items_cart_list = array(
          'id' => $items->id,
          'name' => $items->name,
          'price' => $items->price,
          'quantity' => $qty,
          'attributes' => array(
            'total' => $items->price * $qty,
            'variant' => $variant
          )
      );

      $check_cartEmpty = $cartSessionAuthentication->isEmpty();
      $items_content = $cartSessionAuthentication->getContent($items->id);
      $subtotal = $cartSessionAuthentication->getSubTotal();

      //if item doesn't exist display error messages
      if(!$items){
        return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
      }

      // If first Items was inserted on cart if cart was totally empty
      if($check_cartEmpty == true){        
        $cartSessionAuthentication->add($items_cart_list);
          return response()->json(['success' => 1, 'message' => 'Cart Inserted','data' => $items_content,'subtotal' => $subtotal], 200);
      }

      //If another same item updated on cart, increase the qty to one, else insert different item 
      if(isset($items_content[$items_id]['id'])){
        $items_content[$items_id]['quantity'] += $qty;
        $cartSessionAuthentication->update($items_id,array(
          'quantity' => array('relative' => false, 'value' => $items_content[$items_id]['quantity'] ),
          'attributes' => array('total'=> $items_content[$items_id]['quantity'] * $items_content[$items_id]['price'],'variant' => $variant)
        ));
      } else {
          $cartSessionAuthentication->add($items_cart_list);
          return response()->json(['success' => 1, 'message' => 'Another Items Inserted','data' => $items_content,'subtotal' => $subtotal ], 200);
      }

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

      \Cart::session($authArray['id'])->update($items_id,array(
        'quantity' => array('relative' => false, 'value' => $qty ),
        'attributes' => array('total'=> $qty * $items_content[$items_id]['price'],'variant' => $items_content[$items_id]['attributes']['variant'])
      ));

      return response()->json(['success' => 1, 'message' => 'Session items qty updated','data'=>$items_content[$items_id]], 200);
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

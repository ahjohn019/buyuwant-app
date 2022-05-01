<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Cart;
use App\Models\User;
use App\Models\Items;
use App\Models\Discount;
use App\Models\CouponUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
  protected $cart_session;

  public function __construct()
  {
    $this->middleware('auth:api');
    $this->cart_session = \Cart::session(Auth::id());
  }

  //session cart test
  //View Cart
  public function viewCartSession()
  {
    $items_content =$this->cart_session->getContent();
    $subtotal = $this->cart_session->getSubTotal();
    $subtotalTax = ($subtotal * 0.06) +  $subtotal;
    $subtotalFinalTax = number_format($subtotalTax, 2, '.', ' ');
    $getConditions = $this->cart_session->getConditions();

    if($getConditions->isNotEmpty()){
      $subtotalFinalTax = $subtotal;
    }


    return response()->json([
      'success' => 1, 
      'message' => 'Display Cart Successfully', 
      'data' => $items_content, 
      'user' => Auth::id(), 
      'subtotal' =>  $this->cart_session->getSubTotal(), 
      'subtotalWithTax' => $subtotalFinalTax], 200);
  }

  //Add Cart
  public function addCartSession(Request $request)
  {
    $items_id = $request->items_id;
    $qty = (int)$request->quantity;
    $variant = $request->input('variant');
    $items = Items::find($items_id);
    $subtotal = $this->cart_session->getSubTotal();
    $items_content =$this->cart_session->getContent($items->id);

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

    //if item doesn't exist display error messages
    if (!$items) {
      return response()->json([
        'success' => 0, 
        'message' => 'Items not found'], 404);
    }

    // If first Items was inserted on cart if cart was totally empty
    if ($items_content->isEmpty() || empty($items_content[$items_id]['id'])) {
      $this->cart_session->add($items_cart_list);
      return response()->json(['success' => 1, 'message' => 'Cart Inserted', 'data' => $items_content, 'subtotal' =>  $subtotal], 200);
    }
    
    $items_content[$items_id]['quantity'] += $qty;
    $this->cart_session->update($items_id, array(
      'quantity' => array(
        'relative' => false,
        'value' =>  $items_content[$items_id]['quantity']
      ),
      'attributes' => array(
        'total' =>  $items_content[$items_id]['quantity'] * $items_content[$items_id]['price'],
        'variant' => $variant,
        'img' => $items->img
      )
    ));
    

    return response()->json([
      'success' => 1, 
      'message' => 'Cart Updated', 
      'data' => $items_content, 
      'subtotal' =>  $subtotal], 200);
  }

  //Update Specific Items
  public function updateItemSession(Request $request)
  {
    $items_id = $request->items_id;
    $qty = (int)$request->quantity;
    $items = Items::find($items_id);

    if (!$items) {
      return response()->json([
        'success' => 0, 
        'message' => 
        'Items not found'], 404);
    }

    $items_content = $this->cart_session->getContent($items->id);

    $this->cart_session->update($items_id, array(
      'quantity' => array('relative' => false, 'value' => $qty),
      'attributes' => array(
        'original_price' => $items_content[$items_id]['attributes']['original_price'],
        'total' => $qty * $items_content[$items_id]['price'],
        'variant' => $items_content[$items_id]['attributes']['variant'],
        'img' => $items->img
      )
    ));

    return response()->json([
      'success' => 1, 
      'message' => 'Session items qty updated', 
      'data' => $items_content[$items_id]], 200);
  }

  //Delete Specific Items
  public function deleteItemsSession(Request $request)
  {
    $items_id = $request->items_id;
    $items = Items::find($items_id);

    if (!$items) {
      return response()->json([
        'success' => 0, 
        'message' => 'Items not found'], 404);
    }

    $this->cart_session->remove($items_id);
    return response()->json([
      'success' => 1, 
      'message' => 'Session items Deleted'], 200);
  }


  //Clear All Cart Items
  public function clearCartSession(Request $request)
  {
    $this->cart_session->clear();
    return response()->json([
      'success' => 1, 
      'message' => 'Clear All Cart'], 200);
  }

}

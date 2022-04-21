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
use App\Http\Controllers\DiscountController;

class CartController extends Controller
{
  protected $authUser;

  public function __construct(DiscountController $discount)
  {
    $this->middleware('auth:api');
    $this->discount = $discount;
  }

  //session cart test
  //View Cart
  public function viewCartSession()
  {
    $items_content = \Cart::session(Auth::id())->getContent();
    $subtotal = \Cart::session(Auth::id())->getSubTotal();
    $subtotalTax = ($subtotal * 0.06) + $subtotal;
    $subtotalFinalTax = number_format($subtotalTax, 2, '.', ' ');

    dump($subtotal);

    return response()->json([
      'success' => 1, 
      'message' => 'Display Cart Successfully', 
      'data' => $items_content, 
      'user' => Auth::id(), 
      'subtotal' => $subtotal, 
      'subtotalWithTax' => $subtotalFinalTax], 200);
  }

  //Add Cart
  public function addCartSession(Request $request)
  {
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

    $check_cartEmpty = \Cart::session(Auth::id())->isEmpty();
    $items_content = \Cart::session(Auth::id())->getContent($items->id);
    $subtotal = \Cart::session(Auth::id())->getSubTotal();


    //if item doesn't exist display error messages
    if (!$items) {
      return response()->json([
        'success' => 0, 
        'message' => 'Items not found'], 404);
    }

    // If first Items was inserted on cart if cart was totally empty
    if ($check_cartEmpty == true || empty($items_content[$items_id]['id'])) {
      \Cart::session(Auth::id())->add($items_cart_list);
      return response()->json(['success' => 1, 'message' => 'Cart Inserted', 'data' => $items_content, 'subtotal' => $subtotal], 200);
    } else {
      $items_content[$items_id]['quantity'] += $qty;
      \Cart::session(Auth::id())->update($items_id, array(
        'quantity' => array(
          'relative' => false,
          'value' => $items_content[$items_id]['quantity']
        ),
        'attributes' => array(
          'total' => $items_content[$items_id]['quantity'] * $items_content[$items_id]['price'],
          'variant' => $variant,
          'img' => $items->img
        )
      ));
    }

    return response()->json([
      'success' => 1, 
      'message' => 'Cart Updated', 
      'data' => $items_content, 
      'subtotal' => $subtotal], 200);
  }

  //Update Specific Items
  public function updateItemSession(Request $request)
  {
    $items_id = $request->items_id;
    $qty = (int)$request->quantity;
    $items = Items::find($request->input('items_id'));

    if (!$items) {
      return response()->json([
        'success' => 0, 
        'message' => 
        'Items not found'], 404);
    }

    $items_content = \Cart::session(Auth::id())->getContent($items->id);

    \Cart::session(Auth::id())->update($items_id, array(
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
    $items = Items::find($request->input('items_id'));

    if (!$items) {
      return response()->json([
        'success' => 0, 
        'message' => 'Items not found'], 404);
    }

    \Cart::session(Auth::id())->remove($items_id);
    return response()->json([
      'success' => 1, 
      'message' => 'Session items Deleted'], 200);
  }


  //Clear All Cart Items
  public function clearCartSession(Request $request)
  {
    \Cart::session(Auth::id())->clear();
    return response()->json([
      'success' => 1, 
      'message' => 'Clear All Cart'], 200);
  }

}

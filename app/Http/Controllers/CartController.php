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


    public function index(){
      $authArray = $this->authUser->toArray();
      //get auth user for whole cart item
      $cart = Cart::where('user_id', $authArray['id'])->get();

      return response()->json(['success' => 1, 'message' => $cart], 200);
    }

    public function viewCart($id)
    { 
        $authArray = $this->authUser->toArray();
        $cart_item = Cart::find($id);
        //validate cart items
        if(!$cart_item){
          return response()->json(['success' => 0, 'message' => 'Cart items not found'], 404);
        }
        if($authArray['id'] != $cart_item->user_id){
          return response()->json(['success' => 0, 'message' => 'This cart does not belongs to you.'], 200);
        }
        return response()->json(['success' => 1, 'item' => $cart_item], 200);
    }

    public function addToCart(Request $request, Cart $id){
        $authArray = $this->authUser->toArray();

        $validator = Validator::make($request->all(),[
          'items_id' => 'required'
        ]);
        if ($validator->fails()) {
          return response()->json($validator->errors(), 422);
        }
        //find items by id
        $items = Items::find($request->input('items_id'));
        //validate cart items
        if(!$items){
          return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
        }
        //check duplicate items rows, if existed updated specific item qty
        $cartCount = Cart::with('items')->where('user_id', $authArray['id'])->where('items_id', $request->input('items_id'))->count();

        if($cartCount > 0){
            Cart::with('items')
                ->where('user_id', $authArray['id'])
                ->where('items_id', $request->input('items_id'))
                ->increment('quantity');

            $cartQtyUpdate = Cart::with('items')->where('user_id', $authArray['id'])->where('items_id', $request->input('items_id'))->value('quantity');
            $cartTotalWithQty = $items->price * $cartQtyUpdate;
            $cartTotalUpdate = Cart::with('items')->where('user_id', $authArray['id'])->where('items_id', $request->input('items_id'))->update(array('total'=>$cartTotalWithQty));

            return response()->json(['success' => 1, 'message' => 'Selected quantity updated','data'=>$cartTotalUpdate], 200);
        } 

        //store to shopping cart
        $cart_item = new Cart();
        $cart_item->user_id = $authArray['id'];
        $cart_item->items_id = $request->items_id;
        $cart_item->quantity = (int)$request->quantity;
        $cart_item->total = $items->price;
        $cart_item->save();

        //store to db
        $cartItem = Cart::with('items')->where('user_id', $authArray['id'])->where('items_id', $request->input('items_id'))->first();

        return response()->json(['success' => 1, 'message' => 'Item added successfully to the cart', 'item' => $cartItem], 200);
    }

    public function updateCart(Request $request, Cart $id){
        //update quantity
        $authArray = $this->authUser->toArray();

        $validator = Validator::make($request->all(),[
          'items_id' => 'required',
          'quantity' => 'required'
        ]);

        if ($validator->fails()) {
          return response()->json($validator->errors(), 422);
        }

        if($authArray['id'] != $id->user_id){
          return response()->json(['success' => 1, 'message' => 'This cart does not belongs to you.'], 200);
        }

        //update the item total with qty
        $items = Items::find($request->items_id);
        $cartTotalUpdate = $items->price * $request->quantity;

        //update items by id
        $id->quantity = $request->quantity;
        $id->total = $cartTotalUpdate;
        $id->save();
 
        return response()->json(['success' => 1, 'message' => 'Item updated successfully', 'item' => $id], 200);
    }

    public function removeItemCart($id)
    {
        $authArray = $this->authUser->toArray();
        $cart_item = Cart::find($id);
        //validate cart items
        if(!$cart_item){
            return response()->json(['success' => 0, 'message' => 'Cart items not found'], 404);
        }
        if($authArray['id'] != $cart_item->user_id){
            return response()->json(['success' => 1, 'message' => 'This cart does not belongs to you.'], 200);
        }
        $cart_item->delete();
        return response()->json(['success' => 1, 'message' => 'Item deleted successfully'], 200);
    }

    public function removeAllCart()
    {
        $authArray = $this->authUser->toArray();

        //get auth user for whole cart item
        $cart = Cart::where('user_id', $authArray['id'])->get();

        if (!$cart) {
            return response()->json(['success' => 0, 'message' => 'Your cart has no items to remove'], 500);
        }

        //remove all cart item
        foreach ($cart as $item) {
            $item->delete();
        }
      return response()->json(['success' => 1, 'message' => 'Cart cleared successfully'], 200);
    }


    //session cart test
    //View Cart
    public function viewCartSession(){
      $authArray = $this->authUser->toArray();
      $viewCart = Session::has('cart') ? Session::get('cart') : null;
      if($viewCart){
        foreach($viewCart as $ct){
          if($authArray['id'] != $ct['user_id']){
            return response()->json(['success' => 1, 'message' => 'Display Cart Successfully', 'data' => $viewCart], 200);
          }
        }
      } 
      
      return response()->json(['success' => 1, 'message' => 'Display Cart Successfully', 'data' => $viewCart], 200);
    }


    //Add Cart
    public function addCartSession(Request $request){
        $authArray = $this->authUser->toArray();
        $id = $request->items_id;
        $qty = (int)$request->quantity;
        
        $items = Items::find($request->input('items_id'));
        if(!$items){
          return response()->json(['success' => 0, 'message' => 'Items not found'], 404);
        }
        $oldCart = Session::has('cart') ? Session::get('cart') : null;

        $cart = new Cart();
        $cart->items_id = $id;
        $cart->quantity = (int)$qty;
        $cart->user_id = $authArray['id'];
        $cart->unitprice = (int)$items->price;
        $cart->subtotal = (int)$items->price * $qty;

        if($oldCart){
          foreach($oldCart as $ct){
            if($ct['items_id'] == $cart->items_id ){  
              $request->session()->put('quantity', (int)$ct['quantity'] += 1);
              $request->session()->put('subtotal', (int)$ct['subtotal'] += (int)$items->price);
              return response()->json(['success' => 1, 'message' => 'Session items updated', 'data' => $oldCart], 200);
            }
          }
          $request->session()->push('cart', $cart);
        } else {
          $request->session()->push('cart', $cart);
        }
        
        return response()->json(['success' => 1, 'message' => 'Session items created', 'data' => $oldCart], 200);
    }

    //Clear All Cart Items
    public function clearCartSession(Request $request) {
      $authArray = $this->authUser->toArray();
      $viewCart = Session::has('cart') ? Session::get('cart') : null;
      // if($viewCart){
      //   foreach($viewCart as $ct){
      //     if($authArray['id'] != $ct['user_id']){
      //       return response()->json(['success' => 0, 'message' => 'This cart does not belongs to you.'], 422);
      //     }
      //     $request->session()->forget('cart');
      //   }
      // } 
      $request->session()->forget('cart');
      return response()->json(['success' => 1, 'message' => 'Session items Deleted'], 200);
    }


}

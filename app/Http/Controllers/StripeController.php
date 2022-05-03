<?php

namespace App\Http\Controllers;

use Stripe;
use Validator;
use App\Models\User;
use App\Models\Orders;
use App\Models\Address;
use App\Models\CouponUser;

use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CartController;

class StripeController extends Controller
{
    protected $authUser;

    public function __construct(CartController $cartController){
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $this->middleware('auth:api');
        $this->cartController = $cartController;
    }

    public function createCustomer($address_id){
        if(Auth::user()->stripe_id !== null){
            return response()->json(["message" => "Already Exist!"], 422);
        }

        if(empty($address_id)){
            return response()->json(["message" => "Address Not Found!"], 422);
        }

        $address = Address::find($address_id);
        
        $create_customer = \Stripe\Customer::create([
            'email' => Auth::user()->email, 
            'name' => Auth::user()->name,
            'phone' => $address->phone_number,
            'address' => ([
                'line1' => $address->address_line,
                'country' =>  'MY',
                'postal_code' => $address->postcode,
                'state' =>  $address->state
            ])
        ]);

        $customerArray = $create_customer->toArray();
        $customerStripeId = $customerArray["id"];

        User::where('id', Auth::id())->update(array('stripe_id' => $customerStripeId));

        return response()->json(['customer'=>$create_customer],200);
    }

    public function deleteCustomer(Request $request){
        $delete_customer = \Stripe\Customer::retrieve(Auth::user()->stripe_id)->delete();
        User::where('id',Auth::id())->update(array('stripe_id' => null));
        return response()->json(['customer'=>$delete_customer],200);
    }

    public function createPaymentMethod(Request $request){
        $validator = Validator::make($request->all(), [
            'card_number' => 'required',
            'exp_month' => 'required',
            'exp_year' => 'required',
            'cvc' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        if(empty($request->address_id)){
            return response()->json(["message" => "Address Not Found!"], 422);
        }

        $address = Address::find($request->address_id);

        $createPaymentMethod = \Stripe\PaymentMethod::create([
            'billing_details' =>([
                'address' => ([
                    'line1' => $address->address_line, 
                    'country' => 'MY',
                    'postal_code' => $address->postcode, 
                    'state' => $address->state
                ]),
                'email' => Auth::user()->email,
                'name' => Auth::user()->name,
                'phone' => $address->phone_number
            ]),
            'type' => 'card',
            'card' => [
                'number' => $request->input('card_number'), 
                'exp_month' => $request->input('exp_month'),
                'exp_year' => $request->input('exp_year'),
                'cvc' => $request->input('cvc'),
            ],
        ]);    

        return response()->json(['pay_method'=>$createPaymentMethod],200);
    }

    public function postPayIntent(Request $request){
        $getCartSession = $this->cartController->viewCartSession();
        $getSessionData = $getCartSession->getData()->data;
        $getSubtotalOnly = $getCartSession->getData()->subtotal;

        $storesOrderItems = [];

        if(empty(Auth::user()->stripe_id)){
            $this->createCustomer($request->address_id);
        }

        if($request->input('amount') <= 0){
            return response()->json(["message" => "Cart at least must have one item before checkout!"], 422);
        }

        if(empty($request->address_id)){
            return response()->json(["message" => "Address Not Found!"], 422);
        }

        $address = Address::find($request->address_id);

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $request->input('amount'),
            'currency' => 'myr',
            'metadata' => ['integration_check' => 'accept_a_payment'],
            'customer' => Auth::user()->stripe_id,
            'payment_method' => $request->input('payment_method'),
            'shipping' => [
                'address' => ([
                    'country' => $address->country,
                    'line1' => $address->address_line,
                    'postal_code' => $address->postcode,
                    'state' => $address->state
                ]),
                'name' => Auth::user()->name,
                'phone' => $address->phone_number
            ]
          ]);

        $getSubtotalTax = ((int)$intent['amount'] / 100);

        $confirmPayment = \Stripe\PaymentIntent::retrieve(
            $intent->id,
            ['payment_method' => $intent->payment_method]
        )->confirm();
        
        //Start Order Create Custom Test
        //1.create an order
        $orderCreate = Orders::create([
            'user_id' => Auth::id(),
            'total' => $getSubtotalOnly,
            'total_tax' => $getSubtotalTax,
            'status' => 'pending'
        ]);

        //2. insert session cart data followed by order id
        foreach($getSessionData as $singleData){
            $create_order_items = OrderItems::create([
                'order_id' => $orderCreate->id,
                'items_id' => $singleData->id,
                'quantity' => $singleData->quantity,
                'amount' => $singleData->price,
                'total' => ($singleData->quantity * $singleData->price),
                'variant_details' => $singleData->attributes->variant === null ? "None" : implode(",", $singleData->attributes->variant),
                'status' => 'available'
            ]);
            $storesOrderItems[] = $create_order_items; 
        }

        return response()->json(['paymnet_status'=>$storesOrderItems],200);
    }
}

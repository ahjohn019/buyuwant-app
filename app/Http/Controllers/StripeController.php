<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use App\Models\User;
use App\Http\Controllers\CartController;
use App\Models\Orders;
use App\Models\OrderItems;

use Validator;

class StripeController extends Controller
{
    protected $authUser;

    public function __construct(CartController $cartController){
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $this->middleware('auth:api');
        $this->authUser = auth()->user();
        $this->authArray = $this->authUser->toArray();
        $this->cartController = $cartController;
    }

    public function createCustomer(Request $request){
        $validator = Validator::make($request->all(), [
            'address_line' => 'required',
            'postcode' => 'required',
            'state' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        if($this->authUser->stripe_id !== null){
            return response()->json(["message" => "Already Exist!"], 422);
        }

        $create_customer = \Stripe\Customer::create([
            'email' => $this->authArray['email'], 
            'name' => $this->authArray['name'],
            'phone' => $request->input('phone_number'),
            'address' => ([
                'line1' => $request->input('address_line'),
                'country' =>  'MY',
                'postal_code' => $request->input('postcode'),
                'state' =>  $request->input('state')
            ])
        ]);

        $customerArray = $create_customer->toArray();
        $customerStripeId = $customerArray["id"];

        User::where('id',$this->authUser->id)->update(array('stripe_id' => $customerStripeId));

        return response()->json(['customer'=>$create_customer],200);
    }

    public function deleteCustomer(Request $request){
        $delete_customer = \Stripe\Customer::retrieve($this->authUser->stripe_id)->delete();
        User::where('id',$this->authUser->id)->update(array('stripe_id' => null));
        return response()->json(['customer'=>$delete_customer],200);
    }

    public function createPaymentMethod(Request $request){
        $validator = Validator::make($request->all(), [
            'card_number' => 'required',
            'exp_month' => 'required',
            'exp_year' => 'required',
            'cvc' => 'required',
            'address_line' => 'required',
            'postcode' => 'required',
            'state' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $createPaymentMethod = \Stripe\PaymentMethod::create([
            'billing_details' =>([
                'address' => ([
                    'line1' => $request->input('address_line'), 
                    'country' => 'MY',
                    'postal_code' => $request->input('postcode'), 
                    'state' => $request->input('state') 
                ]),
                'email' => $this->authArray['email'],
                'name' => $this->authArray['name'],
                'phone' => $request->input('phone_number') 
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
        //1. get Payment amount
        //2. get session cart data
        //3. create order items into database
        $getCartSession = $this->cartController->viewCartSession();
        $getSessionData = $getCartSession->getData()->data;
        $getSubtotalOnly = $getCartSession->getData()->subtotal;

        $storesOrderItems = [];

        if($this->authUser->stripe_id === null){
            return response()->json(["message" => "You need login to purchase item!"], 422);
        }

        if($request->input('amount') <= 0){
            return response()->json(["message" => "Cart at least must have one item before checkout!"], 422);
        }

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $request->input('amount'),
            'currency' => 'myr',
            'metadata' => ['integration_check' => 'accept_a_payment'],
            'customer' => $this->authUser->stripe_id,
            'payment_method' => $request->input('payment_method'),
            'shipping' => [
                'address' => ([
                    'country' => $request->input('ship_country'),
                    'line1' => $request->input('ship_addrline'),
                    'postal_code' => $request->input('ship_postalcode'),
                    'state' => $request->input('ship_state')
                ]),
                'name' => $this->authArray['name'],
                'phone' => $request->input('ship_phonenum')
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
            'user_id' => $this->authArray['id'],
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
                'status' => 'pending'
            ]);
            $storesOrderItems[] = $create_order_items; 
        }

        return response()->json(['paymnet_status'=>$storesOrderItems],200);
    }
}

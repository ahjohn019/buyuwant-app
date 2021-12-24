<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use App\Models\User;
use Validator;

class StripeController extends Controller
{
    protected $authUser;

    public function __construct(){
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $this->middleware('auth:api');
        $this->authUser = auth()->user();
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

        $authArray = $this->authUser->toArray();


        if($this->authUser->stripe_id !== null){
            return response()->json(["message" => "Already Exist!"], 422);
        }

        $create_customer = \Stripe\Customer::create([
            'email' => $authArray['email'], 
            'name' => $authArray['name'],
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

        $authArray = $this->authUser->toArray();

        $createPaymentMethod = \Stripe\PaymentMethod::create([
            'billing_details' =>([
                'address' => ([
                    'line1' => $request->input('address_line'), 
                    'country' => 'MY',
                    'postal_code' => $request->input('postcode'), 
                    'state' => $request->input('state') 
                ]),
                'email' => $authArray['email'],
                'name' => $authArray['name'],
                'phone' => $request->input('phone_number') 
            ]),
            'type' => 'card',
            'card' => [
                'number' => $request->input('card_number'), //'5555555555554444'
                'exp_month' => $request->input('exp_month'),//8
                'exp_year' => $request->input('exp_year'),//2022
                'cvc' => $request->input('cvc'),//391
            ],
        ]);    

        return response()->json(['pay_method'=>$createPaymentMethod],200);
    }

    public function postPayIntent(Request $request){
        $authArray = $this->authUser->toArray();
        if($this->authUser->stripe_id === null){
            return response()->json(["message" => "You need login to purchase item!"], 422);
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
                'name' => $authArray['name'],
                'phone' => $request->input('ship_phonenum')
            ]
          ]);

        $confirmPayment = \Stripe\PaymentIntent::retrieve(
            $intent->id,
            ['payment_method' => $intent->payment_method]
        )->confirm();

        return response()->json(['paymnet status'=>$confirmPayment],200);
          
    }
}

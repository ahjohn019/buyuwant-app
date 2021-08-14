<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use App\User;

class StripeController extends Controller
{
    
    public function __construct(){
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $this->middleware('auth:api');
    }


    public function createCustomer(Request $request){
        $authUser= auth()->user();
        $authArray = $authUser->toArray();

        if($authUser->stripe_id !== null){
            return response()->json(["message" => "Already Exist!"], 422);
        }

        $create_customer = \Stripe\Customer::create([
            'email' => $authArray['email'],
            'name' => $authArray['name'],
            'phone' => $authArray['phone_number'],
            'address' => ([
                'line1' => $authArray['address'],
                'country' => $authArray['country'],
                'postal_code' => $authArray['postcode'],
                'state' => $authArray['state']
            ])
        ]);

        $customerArray = $create_customer->toArray();
        $customerStripeId = $customerArray["id"];

        User::where('id',$authUser->id)->update(array('stripe_id' => $customerStripeId));

        return response()->json(['customer'=>$create_customer],200);
    }

    public function deleteCustomer(Request $request){
        $authUser= auth()->user();
        $delete_customer = \Stripe\Customer::retrieve($authUser->stripe_id)->delete();
        User::where('id',$authUser->id)->update(array('stripe_id' => null));
        return response()->json(['customer'=>$delete_customer],200);
    }


    public function postStripe(Request $request){

        $intent = \Stripe\PaymentIntent::create([
            'amount' => 1099,
            'currency' => 'myr',
            'metadata' => ['integration_check' => 'accept_a_payment'],
          ]);

        return response()->json(['paymnet status'=>$intent],200);
          
    }
}

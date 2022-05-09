<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Address;
use App\Traits\ValidationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    //
    use ValidationTrait;

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(){
        $address = Address::all();
        return response()->json(['message'=>'Address','data' => $address],200);
    }

    public function store(Request $request){
        $addressList = [
            'address_line' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'phone_number' => 'required|string',
            'postcode' => 'required|string'
        ];

        foreach (array_keys($addressList) as $key){
            if(empty($request->input($key))){
                return $this->validation($request, $addressList);
            }
        }

        $user_id = ['user_id' => Auth::id()];
        $create_address = Address::create(array_merge($request->all(), $user_id));

        return response()->json(['message'=>'Address created','data' => $create_address]);
    }

    public function show($id) {
        $address = Address::find($id);
        return $address;
    }

    public function update(Request $request, $id){
        $address = Address::find($id);
        $address->update($request->all());

        return response()->json([
            'message' => 'address updated!',
            'address' => $id
        ]);
    }

    public function destroy($id){
        Address::destroy($id);
        return response()->json([
            'message' => 'address deleted'
        ]);
    }

}

<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(){
        $address = Address::all();
        return response()->json(['message'=>'Address','data' => $address],200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'address_line' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'phone_number' => 'required|string',
            'postcode' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $create_address = Address::create([
            'address_line' => $request->input('address_line'),
            'state' => $request->input('state'),
            'country' => $request->input('country'),
            'phone_number' => $request->input('phone_number'),
            'postcode' => $request->input('postcode'),
            'user_id' => Auth::id()
        ]);

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

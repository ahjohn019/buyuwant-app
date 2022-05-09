<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        //
        $payment = Payment::all();
        return response()->json(['message'=>'Payment','data' => $payment],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'type' => 'required|string',
            'provider' => 'required|string',
            'transaction_id' => 'required|string',
            'status' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $create_payment = Payment::create([
            'type' => $request->type,
            'provider' => $request->provider,
            'transaction_id' => $request->transaction_id,
            'status' => $request->status,
            'order_id' => $request->order_id,
            'user_id' => Auth::id()
        ]);

        return response()->json(['message'=>'Payment created','data' => $create_payment]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $payment = Payment::find($id);
        return $payment;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $payment = Payment::find($id);
        $payment->update($request->all());

        return response()->json([
            'message' => 'payment updated!',
            'payment' => $id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        Payment::destroy($id);
        return response()->json([
            'message' => 'payment deleted'
        ]);
    }
}

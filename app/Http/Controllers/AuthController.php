<?php

namespace App\Http\Controllers;
use Validator;

use App\Models\Role;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use App\Models\DiscountDetails;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login','loginCustomer','loginAdmin', 'register','storeAddress','getAddress','userRole']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json([ 'error' => 'Unauthorized', 'access_token'=> null ], 401);
        }   

        return $this->createNewToken($token);
    }

    
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',

            //optional register info
            'gender' => 'required|string',
            'dob' => 'required|string',
            'phone_number' => 'required|regex:/^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

     /* Get The User Address*/

    // public function getAddress(){
    //     $getAddress = UserAddress::all();
    //     return response()->json(['User Address'=> $getAddress], 200);
    // }

    /* Store The User Address */

    // public function storeAddress(Request $request){
    //     $validator = Validator::make($request->all(), [
    //         'address_line' => 'required|string',
    //         'state' => 'required|string',
    //         'country' => 'required|string',
    //         'phone_number' => 'required|string',
    //         'postcode' => 'required|string',
    //         'user_id' => 'required|string'
    //     ]);

    //     if($validator->fails()){
    //         return response()->json($validator->errors(), 422);
    //     }

    //     $storeAddr = UserAddress::create($request->all());
    //     return response()->json(['message'=>'Address created','data' => $storeAddr]);
    // }

    /* View The User Address */

    // public function showAddress(UserAddress $id){
    //     return $id;
    // }

     /* Update The User Address*/

    // public function updateAddress(Request $request, UserAddress $id){

    //     $id->update($request->all());

    //     return response()->json([
    //         'message' => 'address updated!',
    //         'address' => $id
    //     ]);
    // }

    /* Delete The User Address */

    // public function destroyAddress(UserAddress $id)
    // {
    //     $id->delete();
    //     return response()->json([
    //         'message' => 'address deleted'
    //     ]);
    // }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL(),
            'user' => auth()->user()
        ]);
    }

}
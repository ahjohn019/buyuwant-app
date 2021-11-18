<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemsController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AttributeDetailsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*api/ */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/*Category API */
Route::prefix('category')->group(function(){
    Route::get('/','CategoriesController@index');
    Route::get('/{id}','CategoriesController@show');
    Route::post('/','CategoriesController@store');
    Route::put('/{id}', 'CategoriesController@update');
    Route::delete('/{id}', 'CategoriesController@destroy');
});

/*Items API */
Route::prefix('items')->group(function(){
    Route::get('/','ItemsController@index');
    Route::get('/{id}','ItemsController@show');
    Route::post('/','ItemsController@store');
    Route::post('/{id}', 'ItemsController@update');
    Route::delete('/{id}', 'ItemsController@destroy');

    Route::get('/addToCart/{id}', 'ItemsController@addToCart');
    Route::get('/user-profile', 'ItemsController@getItemsUser');
});


/*Orders API*/
Route::prefix('orders')->group(function(){
    Route::get('/',[OrderController::class, 'index']);
    Route::post('/add',[OrderController::class, 'store']);
    Route::get('/{id}',[OrderController::class, 'show']);
    Route::put('/{id}',[OrderController::class, 'update']);
    Route::delete('/{id}',[OrderController::class, 'delete']);
});

/*Orders Item API*/
Route::prefix('order_items')->group(function(){
    Route::get('/',[OrderItemsController::class, 'index']);
    Route::post('/add',[OrderItemsController::class, 'store']);
    Route::get('/{id}',[OrderItemsController::class, 'show']);
    Route::put('/{id}',[OrderItemsController::class, 'update']);
    Route::delete('/{id}',[OrderItemsController::class, 'delete']);
});

/*Attributes API */
Route::prefix('attributes')->group(function(){
    Route::get('/',[AttributeController::class, 'index']);
    Route::post('/add',[AttributeController::class, 'store']);
    Route::get('/{id}',[AttributeController::class, 'show']);
    Route::put('/{id}',[AttributeController::class, 'update']);
    Route::delete('/{id}',[AttributeController::class, 'delete']);
});

/*Attributes Details API */
Route::prefix('attribute_details')->group(function(){
    Route::get('/',[AttributeDetailsController::class, 'index']);
    Route::post('/add',[AttributeDetailsController::class, 'store']);
    Route::get('/{id}',[AttributeDetailsController::class, 'show']);
    Route::put('/{id}',[AttributeDetailsController::class, 'update']);
    Route::delete('/{id}',[AttributeDetailsController::class, 'delete']);
});


/*Middleware Auth Api */
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/store-address', [AuthController::class, 'storeAddress']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
    Route::get('/get-address',[AuthController::class, 'getAddress']);
});


/*Stripe Payment API */
Route::prefix('pay_stripe')->group(function(){
    Route::post('/create_customer',[StripeController::class, 'createCustomer']);
    Route::post('/delete_customer',[StripeController::class, 'deleteCustomer']);
    Route::post('/create_payment_method',[StripeController::class, 'createPaymentMethod']);
    Route::post('/transaction',[StripeController::class, 'postPayIntent']);
});

/*Cart Controller */
Route::prefix('cart')->group(function(){
    /*Session Cart */
    Route::get('/viewSession',[CartController::class, 'viewCartSession']);
    Route::post('/addSession',[CartController::class, 'addCartSession']);
    Route::post('/updateSession',[CartController::class, 'updateItemSession']);
    Route::post('/delSession',[CartController::class, 'clearCartSession']);
    Route::post('/delItemsSession',[CartController::class, 'deleteItemsSession']);
});
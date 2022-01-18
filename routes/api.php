<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemsController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\VariantController;
use App\Http\Controllers\VariantDetailsController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TagDetailsController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\RoleController;

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
    Route::get('/',[CategoriesController::class, 'index']);
    Route::get('/{id}',[CategoriesController::class, 'show']);
    Route::post('/',[CategoriesController::class, 'store']);
    Route::put('/{id}',[CategoriesController::class, 'update']);
    Route::delete('/{id}',[CategoriesController::class, 'destroy']);
});

/*Items API */
Route::prefix('items')->group(function(){
    Route::get('/',[ItemsController::class, 'index']);
    Route::get('/category/{id}/paginate',[ItemsController::class, 'paginateTest']);
    Route::get('/{id}',[ItemsController::class, 'show']);
    Route::post('/',[ItemsController::class, 'store']);
    Route::post('/{id}', [ItemsController::class, 'update']);
    Route::delete('/{id}', [ItemsController::class, 'destroy']);
    Route::get('/category/{id}', [ItemsController::class, 'filterItemCategory']);
    Route::get('/addToCart/{id}', [ItemsController::class, 'addToCart']);
    Route::get('/user-profile', [ItemsController::class, 'getItemsUser']);
    
});


/*Orders API*/
Route::prefix('orders')->group(function(){
    Route::get('/',[OrderController::class, 'index']);
    Route::post('/add',[OrderController::class, 'store']);
    Route::get('/{id}',[OrderController::class, 'show']);
    Route::put('/{id}',[OrderController::class, 'update']);
    Route::delete('/{id}',[OrderController::class, 'destroy']);
});

/*Orders Item API*/
Route::prefix('order_items')->group(function(){
    Route::get('/',[OrderItemsController::class, 'index']);
    Route::get('/groupBy',[OrderItemsController::class, 'groupBy']);
    Route::post('/add',[OrderItemsController::class, 'store']);
    Route::get('/{id}',[OrderItemsController::class, 'show']);
    Route::put('/{id}',[OrderItemsController::class, 'update']);
    Route::delete('/{id}',[OrderItemsController::class, 'destroy']);
});

/*Attributes API */
Route::prefix('variants')->group(function(){
    Route::get('/',[VariantController::class, 'index']);
    Route::post('/add',[VariantController::class, 'store']);
    Route::get('/{id}',[VariantController::class, 'show']);
    Route::put('/{id}',[VariantController::class, 'update']);
    Route::delete('/{id}',[VariantController::class, 'destroy']);
});

/*Attributes Details API */
Route::prefix('variant_details')->group(function(){
    Route::get('/',[VariantDetailsController::class, 'index']);
    Route::post('/add',[VariantDetailsController::class, 'store']);
    Route::get('/{id}',[VariantDetailsController::class, 'show']);
    Route::put('/{id}',[VariantDetailsController::class, 'update']);
    Route::delete('/{id}',[VariantDetailsController::class, 'destroy']);
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
    Route::get('/show-address/{id}',[AuthController::class, 'showAddress']);
    Route::post('/update-address/{id}',[AuthController::class, 'updateAddress']);
    Route::post('/delete-address/{id}',[AuthController::class, 'destroyAddress']);
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

/* Forget Password */
Route::prefix('forget-password')->group(function(){
    Route::post('/email', [ForgetPasswordController::class,'forget']);
    Route::post('/reset-no-email', [ForgetPasswordController::class,'resetNoEmail']);
    Route::post('/reset-by-email', [ForgetPasswordController::class,'resetByEmail']);
});

/* Tags Controller */
Route::prefix('tags')->group(function(){
    Route::get('/', [TagController::class,'index']);
    Route::post('/add',[TagController::class, 'store']);
    Route::get('/{id}',[TagController::class, 'show']);
    Route::put('/{id}',[TagController::class, 'update']);
    Route::delete('/{id}',[TagController::class, 'destroy']);
});

/* Tags Details Controller */
Route::prefix('tag-details')->group(function(){
    Route::get('/', [TagDetailsController::class,'index']);
    Route::get('/filter/{id}', [TagDetailsController::class,'tagDetailsFilter']);
    Route::post('/add',[TagDetailsController::class, 'store']);
    Route::get('/{id}',[TagDetailsController::class, 'show']);
    Route::put('/{id}',[TagDetailsController::class, 'update']);
    Route::delete('/{id}',[TagDetailsController::class, 'destroy']);
});

/*Role Controller */
Route::prefix('role')->group(function(){
    Route::get('/',[RoleController::class, 'index']);
    Route::get('/{id}', [RoleController::class, 'show']);
    Route::post('/add',[RoleController::class, 'store']);
});
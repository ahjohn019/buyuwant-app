<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    Route::put('/{id}', 'ItemsController@update');
    Route::delete('/{id}', 'ItemsController@destroy');
});



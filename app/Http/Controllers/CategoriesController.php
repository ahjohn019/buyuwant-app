<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use Carbon\Carbon;

class CategoriesController extends Controller
{
    //
    public function index()
    {
        $categoryIndex= Categories::all();
        return response()->json(['data'=> $categoryIndex], 200);
    }

    public function store(Request $request)
    {
        //store category data 
        $request->validate([
            'name' => 'required',
            'alias' => 'required',
            'img' => 'required'
        ]);
        $category = Categories::create($request->all());
        
        return response()->json(['message'=> 'Category created', 
        'Data' => $category]);
    }


    public function show(Categories $id){
        return $id;
    }

    

    public function update(Request $request, Categories $id)
    {
        $id->update($request->all());

        return response()->json([
            'message' => 'categories updated!',
            'categories' => $id
        ]);
    }

    public function destroy(Categories $id)
    {
        $categories->delete();
        return response()->json([
            'message' => 'categories deleted'
        ]);
    }
}

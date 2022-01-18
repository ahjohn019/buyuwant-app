<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use App\Models\Tags;
use App\Models\TagDetails;

class TagController extends Controller
{
    //
    protected $authUser;

    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show']]);
        $this->authUser = auth()->user();
    }

    public function index(){
        $tagsIndex = Tags::all();
        return response()->json(['tags'=> $tagsIndex], 200);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'tags' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tags = new Tags;
        $tags->tags = $request->tags;
        $tags->save();

        return response()->json(['message'=>'Tags created','data'=>$tags]);
    }

    public function show(Tags $id){
        return $id;
    }

    public function update(Request $request, Tags $id){
        $id->update($request->all());

        return response()->json([
            'message' => 'tags updated!',
            'tags' => $id
        ]);
    }

    public function destroy(Tags $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'tags deleted'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TagDetails;
use App\Models\User;
use Validator;

class TagDetailsController extends Controller
{
    //
    protected $authUser;

    public function __construct(){
        $this->middleware('auth:api',['except'=>['index','show','tagDetailsFilter']]);
        $this->authUser = auth()->user();
    }

    public function index(){
        $tagsDetailIndex = TagDetails::all();
        return response()->json(['tagsDetails'=> $tagsDetailIndex], 200);
    }

    public function store(Request $request){
        $authArray = $this->authUser->toArray();

        $validator = Validator::make($request->all(),[
            'tags_id' => 'required',
            'items_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tagDetails = TagDetails::create($request->all());
        return response()->json(['message'=>'Tag Details created','data' => $tagDetails]);
    }

    public function tagDetailsFilter($id){
        $specificTags = TagDetails::where('tags_id',$id)->get();
        return response()->json(['tagsFilter'=> $specificTags], 200);
    }

    public function show(TagDetails $id){
        return $id;
    }

    public function update(Request $request, TagDetails $id){

        $id->update($request->all());

        return response()->json([
            'message' => 'tag details updated!',
            'tag details' => $id
        ]);
    }

    public function destroy(TagDetails $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'tag details deleted'
        ]);
    }
}

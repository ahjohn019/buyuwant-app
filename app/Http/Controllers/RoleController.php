<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use Validator;

class RoleController extends Controller
{
    //
    public function __construct(){
        $this->middleware('auth.role:admin',['except'=>['index','show']]);
    }

    public function index(){
        $roleIndex = Role::all();
        return response()->json(['role'=> $roleIndex], 200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $role = Role::create($request->all());
        
        return response()->json(['message'=> 'Role created', 'Data' => $role]);

    }

    public function show(Role $id){
        return $id;
    }
}

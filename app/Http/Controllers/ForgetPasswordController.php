<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;

class ForgetPasswordController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api',['except'=>['forget','resetByEmail']]);
        $this->authUser = auth()->user();
    }
    
    //
    public function forget(Request $request) {
        $credentials = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($credentials->fails()) {
            return response()->json($credentials->errors(), 422);
        }
        Password::sendResetLink($request->only('email'));

        return response()->json(["msg" => 'Reset password link sent on your email id.']);
    }

    public function resetByEmail(Request $request) {
        $credentials = request()->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $reset_password_status = Password::reset($request->only('email', 'password', 'password_confirmation', 'token'), function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json(["msg" => "Invalid token provided"], 400);
        }

        return response()->json(["msg" => "Password has been successfully changed"]);
    }


    public function resetNoEmail(Request $request) {
        $authArray = $this->authUser->toArray();

        $credentials = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|confirmed'
        ]);

        if ($credentials->fails()) {
            return response()->json($credentials->errors(), 422);
        }

        User::find($authArray['id'])->update(['password' => Hash::make($request->password_confirmation)]);

        return response()->json(["msg" => "Password has been successfully changed"]);
    }
}

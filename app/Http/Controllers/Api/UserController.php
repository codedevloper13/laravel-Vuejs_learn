<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Auth;
use Str;


class UserController extends Controller
{
    public function login(Request $request)
    {
        $credential=$request->only('email','password');

            if(Auth::attempt($credential)){
                $token = Str::random(80);
                Auth::user()->api_token = $token;
                Auth::user()->save();
                return response()->json(['token'=>$token],200);
            }
//        $username = $request->email;
//        $password = bcrypt($request->password);
//        $user = User::where('email', $username)->where('password', $password)->first();
//        if ($user) {
//            $token = Hash::make($request->password);
//            $user->api_token = $token;
//            $user->save();
//            return response()->json(['token'=>$token],200);
//        }
        return response()->json(['status'=>'Email And Password Wrong!'],403);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $auth = Auth::where('email', $request["email"])->first();

        if($auth["password"] == $request["password"]){
            return response()->json($auth, 200);
        }
        else{
            return response()->json("Password is wrong!", 400);
        }
    }

    public function register(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $auth = new Auth;
        $data = $request->All();
        $auth->name = $data["name"];
        $auth->email = $data["email"];
        $auth->password = $data["password"];
        $auth->save();
        return response()->json($auth, 200);
    }
}

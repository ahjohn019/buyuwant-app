import React, { useState, useEffect } from "react";
import NavBar from '../NavBar/NavBar';

export default function ResetPassword(props){
    

    

    useEffect(() =>{
        let email = props.match.params.email
        let finalEmail = email.replace('%40','@')

        console.log(finalEmail);
        console.log(props.match.params.token);
    },[])

    return (
        <div>
            <NavBar />
            <div className="mt-24 mb-6 flex flex-col items-center ">
                <h2 className="text-center text-4xl tracking-tight">Reset Your Password</h2>
            </div>
            <div className="mt-8 w-full max-w-xl m-auto bg-gray-200">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">Current Password</label>
                        <input name="password"  type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" required></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">New Password</label>
                        <input name="password"  type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" required></input>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 


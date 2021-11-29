import React, { useState, useEffect } from "react";
import NavBar from '../NavBar/NavBar';
import { useHistory } from "react-router-dom";

export default function ResetPassword(prop){
    const [confirmPassword,setConfirmPassword] = useState({
        password:'',
        password_confirmation: ''
    })

    const onChangePassword = prop => (event) => {
        event.preventDefault();
        setConfirmPassword({ ...confirmPassword, [prop]: event.target.value });
    }
    
    let history = useHistory();

    const onChangeSubmit = () => {
        let email = prop.match.params.email
        let finalEmail = email.replace('%40','@')

        axios({
            method: 'POST',
            url:'/api/forget-password/reset-by-email',
            params:{
                'email': finalEmail,
                'token': prop.match.params.token,
                'password':confirmPassword.password,
                'password_confirmation':confirmPassword.password_confirmation
            }
        }).then(() => {
            history.push("/")
        })
    }
    

    return (
        <div>
            <NavBar />
            <div className="mt-24 mb-6 flex flex-col items-center ">
                <h2 className="text-center text-4xl tracking-tight">Reset Your Password</h2>
            </div>
            <div className="mt-8 w-full max-w-xl m-auto bg-gray-200">
                <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">Current Password</label>
                        <input onChange={onChangePassword('password')} name="password"  type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">New Password</label>
                        <input onChange={onChangePassword('password_confirmation')} name="password"  type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"></input>
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={onChangeSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 


import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login(){
    const [loginInfo, setLoginInfo] = useState({
        email:'', 
        password:''
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [loginError, setLoginError] = useState("")
    const [errStatus, setErrStatus] = useState("")

    let history = useHistory();

    const handleLoginChange = prop => event => {
        event.preventDefault();
        setLoginInfo({...loginInfo, [prop]:event.target.value});
    }

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('/api/auth/login',loginInfo)
            .then(function(response) {
                var now = new Date();
                var time = now.getTime();
                time += response.data.expires_in * 1000;
                now.setTime(time);

                document.cookie = 'authToken='+response.data.access_token+ 
                '; expires=' + now.toUTCString() + 
                '; path=/';
                history.push("/")

            }).catch(function(err) {
                setErrStatus(err.response.status)
                if(err.response.status == 422) {
                    setErrorMessage(err.response.data.password)
                }
                if(err.response.status == 401){
                    setLoginError(err.response.data.error)
                }
            })
    }

    return(
        <div>
                <NavBar />
                <div className="mt-24 mb-6 flex flex-col items-center ">
                    <h2 className="text-center text-4xl tracking-tight">Sign In Your Account</h2>
                    <span className="text-sm mt-3">
                    <Link to="/register" className="text-blue-500">
                        register a new account
                    </Link>
                </span>
                </div>
                <div className="w-full max-w-xl m-auto bg-gray-200">
                    <form onSubmit={handleLogin} className="shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
                        <div className="mb-4">
                            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="email" >Email</label>
                            <input type="email" name="email" onChange={handleLoginChange('email')} type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" required></input>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password" >Password</label>
                            <input name="password" onChange={handleLoginChange('password')} type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" required></input>
                            {
                                errStatus == 401 ? <p className="text-red-500">{loginError}</p> : <p className="text-red-500">{errorMessage[0]}</p>
                            }
                            
                        </div>
                        <div className="mb-6">
                            <label htmlFor="remember" className="flex items-center w-1/2">
                                <input type="checkbox" name="" id="" className="mr-1 bg-white shadow"></input>
                                <span className="text-sm text-gray-700 pt-1">Remember Me</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                       
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                                Sign In
                            </button>
                            
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
    );
}
export default Login;

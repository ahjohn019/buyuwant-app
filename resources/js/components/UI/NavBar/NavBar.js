import React, { useState, useEffect } from 'react';
import {Link, useHistory} from "react-router-dom";

function NavBar () {

    const [noAuth, setNoAuth] = useState("")
    const [getAuth, getAuthList] = useState("")
    let history = useHistory();

    useEffect(() => {
        let authList = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('authToken='))

        getAuthList(authList)
        setNoAuth(document.cookie.indexOf(authList))
    })

    const handleLogout = () => {
        let authToken = getAuth.split('=')[1];
        
        axios({
            method: 'POST',
            url:'/api/auth/logout',
            headers: { 
                'Authorization': 'Bearer '+ authToken
            }
        }).then(response =>{
            document.cookie = 'authToken=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            history.push("/");
        })
    }

    return (
        <div>
            <div className="bg-purple-600 bg-opacity-75 text-2xl text-white h-16 uppercase font-bold ">
                <div className="h-full flex justify-between items-center">
                        <div className="mx-6">
                            <Link to="/">Buyuwant</Link>
                        </div>
                        <div className="flex space-x-4 mx-6">
                            <button type="submit" className="hover:bg-gray-300 rounded-lg" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <button type="submit" className="hover:bg-gray-300 rounded-lg">
                                <Link to="/checkout">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </Link>
                            </button >
                            <button type="submit" className="hover:bg-gray-300 rounded-lg">
                                {
                                    noAuth == -1 ? 
                                    <Link to="/login">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                    :
                                    <Link to="/user-profile">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                }
                            </button>
                            {
                                noAuth == -1 ? 
                                    null 
                                :
                                <button type="submit" className="hover:bg-gray-300 rounded-lg" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            }
                        </div>
                </div>
            </div>
        </div>
    );
}
export default NavBar;
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class NavBar extends Component {

    
    render() {
        
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
                                    <Link to="/login">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;
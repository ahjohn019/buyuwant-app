import React, { useState, useEffect} from 'react';
import livingProd from '../../../../../img/sofa.png';
import shopBag from '../../../../../img/shopping-bag.png';

function LatestProduct() {
    return(
        <div className="m-8 uppercase text-center">
            <p className="text-4xl text-indigo-800 font-bold">Latest Product</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-3 mt-8">
                <div>
                    <div className="p-12 bg-blue-50 shadow-lg relative">
                        <img src={livingProd} alt="livingProd" width="100%" className="object-contain h-24"></img>
                        <button className="bg-green-400 hover:bg-green-600 font-bold text-white py-1 px-2 rounded shadow-lg absolute bottom-3 right-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-between pt-6">
                        <span className="text-indigo-800 font-bold mx-0 my-auto border-b-2">Sofa One</span>
                        <span className="font-bold mx-0 my-auto bg-blue-400 py-1 px-2 text-white rounded shadow-lg">RM1000</span>
                        
                    </div>
                    
                </div>
                <div >
                    <div className="p-12 bg-blue-50 shadow-lg relative">
                        <img src={shopBag} alt="shopBag" width="100%" className="object-contain h-24"></img>
                        <button className="bg-green-400 hover:bg-green-600 font-bold text-white py-1 px-2 rounded shadow-lg absolute bottom-3 right-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-between pt-6">
                        <span className="text-indigo-800 font-bold mx-0 my-auto border-b-2">Sofa One</span>
                        <span className="font-bold mx-0 my-auto bg-blue-400 py-1 px-2 text-white rounded shadow-lg">RM1000</span>
                        
                    </div>
                </div>
                <div >
                    <div className="p-12 bg-blue-50 shadow-lg relative">
                        <img src={livingProd} alt="livingProd" width="100%" className="object-contain h-24"></img>
                        <button className="bg-green-400 hover:bg-green-600 font-bold text-white py-1 px-2 rounded shadow-lg absolute bottom-3 right-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-between pt-6">
                        <span className="text-indigo-800 font-bold mx-0 my-auto border-b-2">Sofa One</span>
                        <span className="font-bold mx-0 my-auto bg-blue-400 py-1 px-2 text-white rounded shadow-lg">RM1000</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LatestProduct;
import React, { useState, useEffect } from "react";
import livingProd from "../../../../../img/sofa.png";

function HighlightProductOne() {
    return (
        <div>
            <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-200 h-full p-12 md:flex items-center justify-evenly text-white shadow-xl rounded space-y-4">
                <div className="flex flex-col items-center md:items-start">
                    <div>
                        <p className="text-3xl font-bold uppercase text-center">
                            Highlight Products
                        </p>
                    </div>
                    <div className="mt-4">
                        <ul className="list-disc">
                            <li>Great Cushions</li>
                            <li>Good fot the perfect sit</li>
                        </ul>
                    </div>
                    <div className="mt-4 space-x-4 flex">
                        <div>
                            <button className="bg-green-400 hover:bg-green-600 font-bold py-2 px-4 rounded shadow-lg uppercase">
                                Add Now
                            </button>
                        </div>
                        <div>
                            <p className="text-sm">Sofa One</p>
                            <p className="text-sm">RM 1000</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img
                        src={livingProd}
                        alt="livingProd"
                        width="100%"
                        className="object-contain h-56"
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default HighlightProductOne;

import React, { Component } from 'react';
import livingProd from '../../../../../img/sofa.png';
import guitarProd from '../../../../../img/guitar-prod.svg';
import cookerProd from '../../../../../img/cooker.svg';

class BestSeller extends Component {
    render() {
        return (
            <div className="m-8 uppercase text-center">
                <p className="text-3xl">Best Seller</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 mt-8">
                    <div className="h-full border rounded-lg w-full md:w-3/4 mx-auto p-2">
                        <div className="h-full flex flex-col items-center w-full md:w-32 mx-auto">
                            <div className="h-full flex items-center">
                                <img src={livingProd} alt="livingProd" width="100%" height="100%"></img>
                            </div>
                            <div>
                                <p className="text-3xl">Sofa</p>
                                <p>home living</p>
                                <p>RM1200</p>
                                <button className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-28 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">add to cart</button>
                            </div>
                        </div> 
                    </div>
                    <div className="h-full border rounded-lg w-full md:w-3/4 mx-auto p-2">
                        <div className="flex flex-col items-center w-full md:w-32 mx-auto">
                            <div className="h-full flex items-center">
                                <img src={guitarProd} alt="guitarProd" width="100%" height="100%"></img>
                            </div>
                            <div>
                                <p className="text-3xl">Sofa</p>
                                <p>home living</p>
                                <p>RM1200</p>
                                <button className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-28 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">add to cart</button>
                            </div>
                        </div> 
                        
                    </div>
                    <div className="h-full border rounded-lg w-full md:w-3/4 mx-auto p-2">
                        <div className="h-full flex flex-col items-center w-full md:w-32 mx-auto">
                            <div className="h-full flex items-center">
                                <img src={cookerProd} alt="cookerProd" width="100%" height="100%"></img>
                            </div>
                            <div>
                                <p className="text-3xl">Sofa</p>
                                <p>home living</p>
                                <p>RM1200</p>
                                <button className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-28 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">add to cart</button>
                            </div>
                        </div> 
                        
                    </div>
                </div>


        </div>
        );
    }
}

export default BestSeller;
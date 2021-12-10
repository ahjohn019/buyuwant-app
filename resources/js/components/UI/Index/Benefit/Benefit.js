import React, { Component } from 'react';
import FoodDelivery from '../../../../../img/food-delivery.png';
import NoScam from '../../../../../img/no-scam.png';
import ShopBag from '../../../../../img/shopping-bag.png';
import Dollar from '../../../../../img/dollar.png';

class Benefit extends Component {
    render() {
        return (
            <div className="m-4 mt-0 uppercase text-left">
                <h1 className="text-4xl text-center font-bold text-indigo-800">Why Choose Our Services ?</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <div className="border rounded-lg shadow-xl">
                        <div className="flex flex-col items-center w-full mx-auto">
                            <div className="p-12 w-full">
                                <img src={FoodDelivery} alt="FoodDelivery" width="100%" className="object-contain h-24"></img>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="text-lg text-indigo-800 text-center font-bold ">Delivery Service</p>
                                <p className="p-4 text-xs text-gray-500 font-bold">No matter how far you are, we will always deliver things on time.</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg shadow-xl">
                        <div className="flex flex-col items-center w-full mx-auto">
                            <div className="p-12 w-full  ">
                                <img src={NoScam} alt="NoScam" width="100%" className="object-contain h-24"></img>
                            </div>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-lg text-indigo-800  text-center font-bold ">No Scam</p>
                            <p className="p-4 text-xs text-gray-500 font-bold">We will ensure all the item is safe and good to use.</p>   
                        </div> 
                    </div>
                    <div className="border rounded-lg shadow-xl">
                        <div className="flex flex-col items-center w-full mx-auto">
                            <div className="p-12 w-full ">
                                <img src={ShopBag} alt="ShopBag" width="100%" className="object-contain h-24"></img>
                            </div>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-lg text-indigo-800  text-center font-bold ">Authentic Product</p>
                            <p className="p-4 text-xs text-gray-500 font-bold">our product is 100% original, directly from factory made.</p>
                        </div>
                    </div>
                    <div className="border rounded-lg shadow-xl">
                        <div className="flex flex-col items-center w-full mx-auto">
                            <div className="p-12 w-full">
                                <img src={Dollar} alt="Dollar" width="100%" className="object-contain h-24"></img>
                            </div>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-lg text-indigo-800 text-center font-bold">Cheap</p>
                            <p className="p-4 text-xs text-gray-500 font-bold">items is direct from our factory made, cost will be cheaper than others marketplace.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Benefit;
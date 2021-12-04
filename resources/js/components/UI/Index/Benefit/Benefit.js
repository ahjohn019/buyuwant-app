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
                    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-center">
                        <div className="flex justify-center items-center ">
                            <div className="w-24 ">
                                <img src={FoodDelivery} alt="FoodDelivery" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-sm text-center font-bold">Delivery Service</p>
                            <p className="mt-4 text-xs">No matter how far you are, we will always deliver things on time.</p>
                        </div>
                    </div>
                    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-center">
                        <div className="flex justify-center items-center ">
                            <div className="w-24  ">
                                <img src={NoScam} alt="NoScam" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-sm text-center font-bold">No Scam</p>
                            <p className="mt-4 text-xs">We will ensure all the item is safe and good to use.</p>   
                        </div> 
                    </div>
                    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-center">
                        <div className="flex justify-center items-center ">
                            <div className="w-24 ">
                                <img src={ShopBag} alt="ShopBag" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-sm text-center font-bold">Authentic Product</p>
                            <p className="mt-4 text-xs">our product is 100% original, directly from factory made.</p>
                        </div>
                    </div>
                    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-center">
                        <div className="flex justify-center items-center ">
                            <div className="w-24 text-xs">
                                <img src={Dollar} alt="Dollar" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-sm text-center font-bold">Cheap</p>
                            <p className="mt-4 text-xs">items is direct from our factory made, cost will be cheaper than others marketplace.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Benefit;
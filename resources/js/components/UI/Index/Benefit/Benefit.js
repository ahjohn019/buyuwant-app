import React, { Component } from 'react';
import FoodDelivery from '../../../../../img/food-delivery.png';
import NoScam from '../../../../../img/no-scam.png';
import ShopBag from '../../../../../img/shopping-bag.png';
import Dollar from '../../../../../img/dollar.png';

class Benefit extends Component {
    render() {
        return (
            <div className="m-8 mt-0 uppercase text-left ">
                <h1 className="text-3xl text-center">Why Choose Our Services ?</h1>
                <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-8">
                    <div className="w-full border rounded-lg shadow-md  p-8 flex flex-col md:flex-row">
                        <div className="flex justify-center items-center ">
                            <div className="w-24 ">
                                <img src={FoodDelivery} alt="FoodDelivery" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-xl font-bold">Delivery Service</p>
                            <p>No matter how far you are, we will always deliver things on time.</p>
                        </div>
                    </div>
                    <div className="w-full border rounded-lg shadow-md p-8 flex flex-col md:flex-row">
                        <div className="flex justify-center items-center ">
                            <div className="w-24  ">
                                <img src={NoScam} alt="NoScam" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-xl font-bold">No Scam</p>
                            <p>We will ensure all the item is safe and good to use.</p>   
                        </div> 
                    </div>
                    <div className="w-full border rounded-lg shadow-md p-8 flex flex-col md:flex-row">
                        <div className="flex justify-center items-center ">
                            <div className="w-24 ">
                                <img src={ShopBag} alt="ShopBag" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-xl font-bold">Authentic Product</p>
                            <p>our product is 100% original, directly from factory made.</p>
                        </div>
                    </div>
                    <div className="w-full border rounded-lg shadow-md p-8 flex flex-col md:flex-row">
                        <div className="flex justify-center items-center ">
                            <div className="w-24 ">
                                <img src={Dollar} alt="Dollar" width="100%"></img>
                            </div>
                        </div>
                        <div className="flex flex-col m-8">
                            <p className="text-xl font-bold">Cheap</p>
                            <p>items is direct from our factory made, cost will be cheaper than others marketplace.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Benefit;
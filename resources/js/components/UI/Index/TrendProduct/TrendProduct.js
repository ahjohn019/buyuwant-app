import React from "react";
import dummyImg from "../../../../../img/dummy_img.png";
import { useHistory } from "react-router-dom";
import AuthToken from "../../../Helper/AuthToken/AuthToken";
import Slider from "react-slick";
import TagDetails from "../../../Helper/TagDetails/TagDetails";
import SlickSlider from "../../../Helper/Slider/SlickSlider";
import AddCartSession from "../../../Helper/AddCartSession/AddCartSession";

function TrendProduct() {
    const { data, loading } = TagDetails(1);
    let history = useHistory();

    let slickSlider = SlickSlider(data.length);

    return (
        <div className="m-8 uppercase text-center">
            <p className="text-4xl text-indigo-800 font-bold">
                Trending Products
            </p>
            <div className="md:flex">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3 mt-8 w-full md:w-3/4">
                    <div>
                        <div className="p-12 bg-purple-50 shadow-md relative h-full flex flex-col md:justify-evenly space-y-6">
                            <span className="font-bold text-xl text-blue-800">
                                25% Off In All Products
                            </span>
                            <button className="bg-green-400 hover:bg-green-600 w-1/2 px-2 py-1 m-auto text-white rounded shadow uppercase font-bold">
                                Shop Now
                            </button>
                            <img
                                src={dummyImg}
                                alt="dummyImg"
                                width="100%"
                                className="object-contain h-18"
                            ></img>
                        </div>
                    </div>
                    <div>
                        <div className="p-12 bg-purple-50 shadow-md relative h-full flex flex-col md:justify-evenly space-y-6">
                            <span className="font-bold text-xl text-blue-800">
                                25% Off In All Products
                            </span>
                            <button className="bg-green-400 hover:bg-green-600 w-1/2 px-2 py-1 m-auto text-white rounded shadow uppercase font-bold">
                                Shop Now
                            </button>
                            <img
                                src={dummyImg}
                                alt="dummyImg"
                                width="100%"
                                className="object-contain h-18"
                            ></img>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 p-3 mt-8">
                    <div className="md:flex">
                        <div className="p-6 bg-blue-50 shadow-lg relative">
                            <img
                                src={dummyImg}
                                alt="dummyImg"
                                width="100%"
                                className="object-contain h-8"
                            ></img>
                        </div>
                        <div className="flex flex-col justify-center m-4 text-center md:text-left">
                            <p className="text-sm font-bold">Sofa One</p>
                            <p>RM1000</p>
                        </div>
                    </div>
                    <div className="md:flex">
                        <div className="p-6 bg-blue-50 shadow-lg relative">
                            <img
                                src={dummyImg}
                                alt="dummyImg"
                                width="100%"
                                className="object-contain h-8"
                            ></img>
                        </div>
                        <div className="flex flex-col justify-center m-4 text-center md:text-left ">
                            <p className="text-sm font-bold">Sofa One</p>
                            <p>RM1000</p>
                        </div>
                    </div>
                    <div className="md:flex">
                        <div className="p-6 bg-blue-50 shadow-lg relative">
                            <img
                                src={dummyImg}
                                alt="dummyImg"
                                width="100%"
                                className="object-contain h-8"
                            ></img>
                        </div>
                        <div className="flex flex-col justify-center m-4 text-center md:text-left">
                            <p className="text-sm font-bold">Sofa One</p>
                            <p>RM1000</p>
                        </div>
                    </div>
                    <div className="md:flex">
                        <div className="p-6 bg-blue-50 shadow-lg relative">
                            <img
                                src={dummyImg}
                                alt="dummyImg"
                                width="100%"
                                className="object-contain h-8"
                            ></img>
                        </div>
                        <div className="flex flex-col justify-center m-4 text-center md:text-left">
                            <p className="text-sm font-bold">Sofa One</p>
                            <p>RM1000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendProduct;

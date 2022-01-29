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
            <div className="p-3 mt-8">
                {loading && <div>Loading...</div>}
                <Slider {...slickSlider}>
                    {!loading &&
                        data.map(response => (
                            <div
                                key={response.tag_one_item.id}
                                className="h-full border rounded-lg shadow-lg max-w-max"
                            >
                                <div className="p-12 m-2 text-left relative">
                                    <img
                                        src={
                                            response.tag_one_item.img == "none"
                                                ? dummyImg
                                                : response.tag_one_item.img
                                        }
                                        alt={
                                            response.tag_one_item.img == "none"
                                                ? dummyImg
                                                : response.tag_one_item.img
                                        }
                                        width="100%"
                                        className="object-contain h-16"
                                    ></img>
                                    <button
                                        onClick={e =>
                                            AddCartSession(
                                                e.currentTarget.value,
                                                AuthToken(),
                                                history,
                                                1
                                            )
                                        }
                                        name="best-seller-cart"
                                        className="bg-green-400 hover:bg-green-600 text-white py-1 px-2 rounded-lg text-sm shadow-lg absolute bottom-2 right-2"
                                        type="submit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-2 w-full ">
                                    <div className=" truncate text-indigo-800 font-bold">
                                        <span>
                                            {response.tag_one_item.name}
                                        </span>
                                    </div>
                                    <div className="p-2 text-blue-800 font-bold">
                                        RM {response.tag_one_item.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
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

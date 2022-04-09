import React from "react";
import dummyImg from "../../../../../img/dummy_img.png";
import { useHistory } from "react-router-dom";
import AuthToken from "../../../Helper/AuthToken/AuthToken";
import Slider from "react-slick";
import TagDetails from "../../../Helper/TagDetails/TagDetails";
import SlickSlider from "../../../Helper/Slider/SlickSlider";
import AddCartSession from "../../../Helper/AddCartSession/AddCartSession";

function LatestProduct() {
    const { data, loading } = TagDetails(2);
    let history = useHistory();
    let slickSlider = SlickSlider(data.length);

    return (
        <div className="m-8 uppercase text-center">
            <p className="text-3xl text-indigo-800 font-bold">
                Latest Products
            </p>
            <div className="p-3 mt-8">
                {loading && <div>Loading...</div>}
                <Slider {...slickSlider}>
                    {!loading &&
                        data.map(response => (
                            <div
                                key={response.tag_one_item.id}
                                className="max-w-max"
                            >
                                <div className="p-12 shadow-lg relative ">
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
                                        className="object-contain h-24"
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
                                        value={response.tag_one_item.id}
                                        className="bg-green-400 hover:bg-green-600 font-bold text-white py-1 px-2 rounded shadow-lg absolute bottom-3 right-4"
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
                                <div className="flex flex-col justify-between pt-6">
                                    <span className="text-indigo-800 font-bold mx-0 my-auto">
                                        {response.tag_one_item.name}
                                    </span>
                                    {response.tag_one_item.discount_price !==
                                    null ? (
                                        <div className="flex justify-center space-x-4 mt-4">
                                            <span className="font-bold mx-0 my-auto bg-red-400 py-1 px-2 text-white rounded shadow-lg line-through">
                                                RM {response.tag_one_item.price}
                                            </span>
                                            <span className="font-bold mx-0 my-auto bg-blue-400 py-1 px-2 text-white rounded shadow-lg">
                                                RM{" "}
                                                {
                                                    response.tag_one_item
                                                        .discount_price
                                                }
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="mt-4 font-bold mx-auto w-1/2 bg-blue-400 py-1 px-2 text-white rounded shadow-lg">
                                            RM {response.tag_one_item.price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
        </div>
    );
}

export default LatestProduct;

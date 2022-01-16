import React, { Component } from "react";
import caringLove from "../../../../../img/caring-love.svg";
import BannerMain from "../../../../../img/banner-buyuwant.jpg";
class Banner extends Component {
    render() {
        return (
            <div className="BannerImg flex items-center mx-auto">
                <img
                    src={BannerMain}
                    alt="caringLove"
                    width="100%"
                    style={{ height: "70vh" }}
                    className="w-full object-cover"
                ></img>
                <div className="flex justify-center items-center m-auto w-full absolute">
                    <div className="flex flex-col w-1/2 p-12 leading-tight">
                        <p
                            className="text-center font-bold uppercase"
                            style={{ fontSize: "4vw" }}
                        >
                            your 2nd hand marketplace
                        </p>
                        <p className="text-sm my-3 text-center uppercase">
                            we provide the best service just for you
                        </p>
                        <button
                            className="m-auto bg-red-500 hover:bg-red-700 w-40 h-11 uppercase font-bold text-white rounded-lg text-xl "
                            type="submit"
                        >
                            learn more
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;

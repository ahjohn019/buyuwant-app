import React, { Component } from 'react';
import caringLove from '../../../../img/caring-love.svg';
class Banner extends Component {
    render() {
        return (
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 uppercase flex" style={{height:"640px"}}>
                <div className="h-full flex flex-col justify-center mx-auto w-full md:w-1/4 leading-loose">
                    <p className="text-4xl text-center md:text-6xl md:text-left my-5 font-bold">your 2nd hand marketplace</p>
                    <p className="text-lg my-3 text-center">cheaper as you think, let's fight against covid-19</p>
                    <button className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-32 h-11 uppercase font-bold text-white rounded-lg text-sm " type="submit">learn more</button>
                </div>
                <div className="BannerImg flex items-center mx-auto ">
                    <img src={caringLove} alt="caringLove"></img>
                </div>
            </div>
        );
    }
}

export default Banner;
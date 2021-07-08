import React, { Component } from 'react';
import guitarProd from '../../../../img/guitar-prod.svg';
import cookerProd from '../../../../img/cooker.svg';
import sportsProd from '../../../../img/football.png';
import groceriesProd from '../../../../img/groceries.svg';
import clothesProd from '../../../../img/old-clothes.svg';
import livingProd from '../../../../img/sofa.png';

class categories extends Component {
    render() {
        return (
            <div className="m-8 uppercase text-center">
                    <p className="text-3xl">Categories</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
                        <div className="h-40 bg-green-200 w-full mx-auto">
                            <div className="h-40 flex items-center mx-auto w-20">
                                <img src={guitarProd} alt="guitarProd" width="100%" ></img>
                            </div>
                            <div className="bg-green-700 text-white text-sm font-bold">
                                music
                            </div>
                        </div>
                        <div className="h-40 bg-green-200 w-full mx-auto">
                            <div className="h-40 flex items-center mx-auto w-20">
                                <img src={cookerProd} alt="cookerProd" width="100%"></img>
                            </div>
                            <div className="bg-green-700 text-white text-sm font-bold">
                                appliances
                            </div>
                        </div>
                        <div className="h-40 bg-green-200 w-full mx-auto">
                            <div className="h-40 flex items-center mx-auto w-20">
                                <img src={sportsProd} alt="sportsProd" width="100%" ></img>
                            </div>
                            <div className="bg-green-700 text-white text-sm font-bold">
                                sports
                            </div>
                        </div>
                        <div className="h-40 bg-green-200 w-full mx-auto">
                            <div className="h-40 flex items-center mx-auto w-20">
                                <img src={groceriesProd} alt="groceriesProd" width="100%"></img>
                            </div>
                            <div className="bg-green-700 text-white text-sm font-bold">
                                groceries
                            </div>
                        </div>
                        <div className="h-40 bg-green-200 w-full mx-auto">
                            <div className="h-40 flex items-center mx-auto w-20">
                                <img src={clothesProd} alt="clothesProd" width="100%"></img>
                            </div>
                            <div className="bg-green-700 text-white text-sm font-bold">
                                clothes
                            </div>
                        </div>
                        <div className="h-40 bg-green-200 w-full mx-auto">
                            <div className="h-40 flex items-center mx-auto w-20">
                                <img src={livingProd} alt="livingProd" width="100%"></img>
                            </div>
                            <div className="bg-green-700 text-white text-sm font-bold">
                                home living
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default categories;
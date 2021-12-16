import React, { useState, useEffect} from 'react';
import livingProd from '../../../../../img/sofa.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthToken from '../../../UI/Authentication/AuthToken';
import Slider from "react-slick";
import TagDetails from "../../TagDetails/TagDetails";
import SlickSlider from "../../Slider/SlickSlider";

export default function BestSeller(){
    const {data, loading} = TagDetails(3)
    let history = useHistory()
    let slickSlider = SlickSlider()

    const handleSubmit = (event) => {
        let itemsId = event.currentTarget.value       
        let authTokenUsage = AuthToken()   
        if(authTokenUsage < 0){
            history.push('/login')
        } else {
            axios({
                method:'post',
                url:'/api/cart/addSession',
                params: {items_id: itemsId, quantity: 1},
                headers: { 
                    'Authorization': 'Bearer '+ authTokenUsage
                  }
            }).then(()=>{
                history.push("/checkout")
            })
        }
    }
      
    return(
        <div className="m-8 uppercase text-center">
                <p className="text-3xl text-indigo-800 font-bold">Best Seller</p>
                <div className="p-3 mt-8">
                {loading && <div>Loading...</div>}
                <Slider {...slickSlider}>
                    {
                        !loading &&
                        data.map((response)=> 
                            
                                <div key={response.tag_one_item.id} className="h-full border rounded-lg shadow-lg max-w-max">
                                    <div className="h-full flex flex-col items-center w-full mx-auto">
                                        <div className="p-12 bg-gray-100 w-full">
                                            <img src={livingProd} alt="livingProd" width="100%" className="object-contain h-24"></img>
                                        </div>
                                        <div className="p-4 w-full ">
                                            <div className="m-2 truncate text-indigo-800 font-bold">
                                                <span>{response.tag_one_item.name}</span>
                                            </div>
                                            <div className="text-blue-800 font-bold">RM {response.tag_one_item.price}</div>
                                            <div className="p-4 flex justify-center">
                                                <Link to={{pathname:`/items_details/${response.tag_one_item.id}`}}>
                                                    <button className="product-grid-btn bg-blue-400 hover:bg-blue-600 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm shadow-lg" type="submit">view</button>
                                                </Link>
                                                <button name="best-seller-cart" value={response.tag_one_item.id} onClick={handleSubmit} className="product-grid-btn bg-green-400 hover:bg-green-600 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm shadow-lg" type="submit">add</button>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                        )
                    }
                </Slider>
                </div>
               
        </div>
    );
}

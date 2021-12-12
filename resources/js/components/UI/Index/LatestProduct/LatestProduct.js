import React, { useState, useEffect} from 'react';
import livingProd from '../../../../../img/sofa.png';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import AuthToken from '../../../UI/Authentication/AuthToken';
import Slider from "react-slick";

function LatestProduct() {
    const [latestItems, setLatestItems] = useState([])

    useEffect(() => {        
        axios.get('/api/tag-details').then(response => {
            var listAllTags = response.data.tagsDetails
            var latestTags = []

            for(var i in listAllTags){
                if(listAllTags[i].tags_id == 2){
                    latestTags.push(listAllTags[i].tag_one_item)
                }
            }
            setLatestItems(latestTags)
        })
    },[])

    let history = useHistory()

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              }
        ]
    };

    return(
        <div className="m-8 uppercase text-center">
            <p className="text-3xl text-indigo-800 font-bold">Latest Products</p>
            <div className="p-3 mt-8">
             <Slider {...settings}>
                {
                    latestItems.map((response)=>
                        <div key={response.id} className="max-w-max">
                            <Link to={{pathname:`/items_details/${response.id}`}}>
                                <div className="p-12 bg-blue-50 shadow-lg relative ">
                                    <img src={livingProd} alt="livingProd" width="100%" className="object-contain h-24"></img>
                                    <button onClick={handleSubmit} value={response.id} className="bg-green-400 hover:bg-green-600 font-bold text-white py-1 px-2 rounded shadow-lg absolute bottom-3 right-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                            <div className="flex justify-between pt-6">
                                <span className="text-indigo-800 font-bold mx-0 my-auto border-b-2">{response.name}</span>
                                <span className="font-bold mx-0 my-auto bg-blue-400 py-1 px-2 text-white rounded shadow-lg">RM {response.price}</span>
                            </div>
                        </div>
                    )
                }
            </Slider>
            </div>
        </div>
    );
}

export default LatestProduct;
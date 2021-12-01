import React, { useState, useEffect} from 'react';
import livingProd from '../../../../../img/sofa.png';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function BestSeller(){
    const [itemsData, setItemsData] = useState([])
    const [noAuth, setNoAuth] = useState("")
    const [token, setAuthToken] = useState("")

    useEffect(() => {
        axios.get('/api/items').then(response => {
            setItemsData(response.data.items)
        })  

        let authList = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('authToken='))

        setAuthToken(authList)
        setNoAuth(document.cookie.indexOf(authList))               
    },[])


    const handleSubmit = (event) => {
        let itemsId = event.currentTarget.value          
        if(noAuth < 0){
            console.log("Need authorized only can add to cart")
        } else {
            let authToken = token.split('=')[1];

            axios({
                method:'post',
                url:'/api/cart/addSession',
                params: {items_id: itemsId, quantity: 1},
                headers: { 
                    'Authorization': 'Bearer '+ authToken
                  }
            }).then(function(response) {console.log(response.data);})
        }
    }

    return(
        <div className="m-8 uppercase text-center">
                <p className="text-3xl">Best Seller</p>
                <form onSubmit={handleSubmit} action="/checkout">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 mt-8">
                    
                        {
                            itemsData.map((response)=> 
                                <div key={response.id} className="h-full border rounded-lg w-full md:w-3/4 mx-auto p-2">
                                    <div className="h-full flex flex-col items-center w-full mx-auto">
                                        <div className="p-6">
                                            <img src={livingProd} alt="livingProd" width="100%" height="100%"></img>
                                        </div>
                                        <div className="p-4">
                                            <div className="w-64 m-2 truncate">
                                                <span>{response.name}</span>
                                            </div>
                                            <p>RM {response.price}</p>
                                            <div className="p-4 flex justify-center">
                                                <Link to={{pathname:`/items_details/${response.id}`}}>
                                                    <button className="product-grid-btn bg-blue-500 hover:bg-blue-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">view</button>
                                                </Link>
                                                {/* <Link to={{pathname:'/checkout'}}> */}
                                                <button name="best-seller-cart" value={response.id} onClick={handleSubmit} className="product-grid-btn bg-red-500 hover:bg-red-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">add cart</button>
                                                {/* </Link> */}
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            )
                        }
                    
                </div>
                </form>
        </div>
    );
}


import React, { useState, useEffect} from 'react';
import livingProd from '../../../../../img/sofa.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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

    let history = useHistory()


    const handleSubmit = (event) => {
        let itemsId = event.currentTarget.value          
        if(noAuth < 0){
            history.push('/login')
        } else {
            let authToken = token.split('=')[1];

            axios({
                method:'post',
                url:'/api/cart/addSession',
                params: {items_id: itemsId, quantity: 1},
                headers: { 
                    'Authorization': 'Bearer '+ authToken
                  }
            }).then(()=>{
                history.push("/checkout")
            })
            
        }
    }

    return(
        <div className="m-8 uppercase text-center">
                <p className="text-4xl text-indigo-800 font-bold">Best Seller</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 mt-8">
                        {
                            itemsData.map((response)=> 
                                <div key={response.id} className="h-full border rounded-lg w-full md:w-3/4 mx-auto shadow-lg">
                                    <div className="h-full flex flex-col items-center w-full mx-auto">
                                        <div className="p-12 bg-gray-100 w-full">
                                            <img src={livingProd} alt="livingProd" width="100%" className="object-contain h-24"></img>
                                        </div>
                                        <div className="p-4 w-full ">
                                            <div className="m-2 truncate text-indigo-800 font-bold">
                                                <span>{response.name}</span>
                                            </div>
                                            <div className="text-blue-800 font-bold">RM {response.price}</div>
                                            <div className="p-4 flex justify-center">
                                                <Link to={{pathname:`/items_details/${response.id}`}}>
                                                    <button className="product-grid-btn bg-blue-400 hover:bg-blue-600 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm shadow-lg" type="submit">view</button>
                                                </Link>
                                                <button name="best-seller-cart" value={response.id} onClick={handleSubmit} className="product-grid-btn bg-green-400 hover:bg-green-600 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm shadow-lg" type="submit">add</button>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            )
                        }
                    
                </div>
               
        </div>
    );
}


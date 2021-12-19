import React, {useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import livingProd from '../../../img/sofa.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AuthToken from '../UI/Authentication/AuthToken';
import { useHistory } from 'react-router-dom';

function CategoryIndex(props){
    const [categoriesDetails, setCategoriesDetails] = useState([])
    let history = useHistory()

    useEffect(() =>{
        let id = props.match.params.categories_id
        const fetchData = async () => {
            const categoryItemDetails = await axios.get(`/api/items/category/${id}`);
            const categoryTitle = await axios.get(`/api/category/${id}`)
            setCategoriesDetails({details_one:categoryItemDetails.data.categoryFilter, details_two:categoryTitle.data.name})
        };
        fetchData();
    },[])

    if(categoriesDetails.length <= 0) return null;   

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
        <div>
            <NavBar />
            <div className="container mx-auto">
                <div className="font-bold uppercase mt-6 flex justify-between">
                    <div className="text-3xl font-bold text-indigo-700 flex items-center">
                        {categoriesDetails.details_two}
                    </div>
                    <div className="flex">
                        <div className="flex items-center">
                            <button className="px-2 py-2 rounded-full hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button className="px-2 py-2 rounded-full hover:bg-gray-200 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        <div className="ml-4">
                            <input type="text" placeholder="Search" className="px-3 py-2 border rounded-lg-md w-full shadow-sm focus:outline-none"/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
                    {
                        categoriesDetails.details_one.map((response)=>
                        <div key={response.id}>
                            <div className="border rounded-lg p-4 shadow h-48 flex justify-center items-center relative ">
                                <Link to={{pathname:`/items_details/${response.id}`}}>
                                    <img src={livingProd} alt="livingProd" width="100%" className="object-contain w-48"></img>
                                </Link>
                                <button onClick={handleSubmit} value={response.id}  name="categories-cart" className="bg-green-400 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm shadow-lg absolute bottom-2 right-2" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                <p className="text-xl font-bold text-indigo-700">{response.name}</p>
                                <p className="font-bold">RM {response.price}</p>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryIndex;


{/* <div className="flex">
                        <div className="border rounded-lg p-4 shadow h-48 flex justify-center relative w-1/2">
                            <img src={livingProd} alt="livingProd" width="100%" className="object-contain w-48"></img>
                        </div>
                        <div className="flex flex-col ml-4">
                            <p className="text-3xl font-bold text-indigo-700">test 1</p>
                            <p className="font-bold">RM 12</p>
                        </div>
                        
                    </div> */}
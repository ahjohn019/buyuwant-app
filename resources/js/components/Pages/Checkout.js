import React, { useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import {Link} from "react-router-dom";
import AuthToken from '../Helper/AuthToken/AuthToken';


function Checkout() {
    const [sessionCartData, setSessionCartData] = useState([])
    const [updatedQty, setUpdatedQty] = useState(1)
    const [subtotal, setSubtotal] = useState("")
    const [subtotalTax, setSubtotalTax] = useState("")
    const [afterUpdate, setAfterUpdate] = useState("")
    const [updatedAllQty, setUpdatedAllQty] = useState("")
    let authTokenUsage = AuthToken()
    let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

    const refreshQty = (event) =>{
        setUpdatedQty(event.target.value);
        setUpdatedAllQty({...updatedAllQty, [event.target.name]: event.target.value})
    }

   
    const cartViewSession = async () => {
        if(authTokenUsage.length <= 0){
            return null
        }
        await axios({
            method: 'GET',
            url:'/api/cart/viewSession',
            headers: authHeaders
            }).then((response) =>{
                setSessionCartData(response.data.data);
                setSubtotal(response.data.subtotal);
                setSubtotalTax(response.data.subtotalWithTax);
        })
        
        return sessionCartData
    }

    useEffect(() =>{cartViewSession()},[])

    
   
    const addSessions = async (itemsId, qty) =>{
        
        await axios({
            method: 'POST',
            url:'/api/cart/updateSession',
            headers: authHeaders, 
            params: {
                items_id: itemsId,
                quantity: qty
            }
            }).then((response) =>{
                cartViewSession()
                setAfterUpdate(response.data);
            })
    }

    const handleDelete = async (event) =>{        
        const deleteId = event.currentTarget.name;

        await axios({
            method: 'POST',
            url:'/api/cart/delItemsSession',
            headers: authHeaders, 
            params: {
                items_id: deleteId
            }
            }).then((response) =>{
                cartViewSession()
                setAfterUpdate(response.data);
            })
        
    }

    const handleClearAll = async () => {
        await axios({
            method: 'POST',
            url:'/api/cart/delSession',
            headers: authHeaders
            }).then(() =>{
                cartViewSession()
            })
    }

    const handleUpdateAll = () =>{
        for (var a in updatedAllQty){
            addSessions(a, updatedAllQty[a]);
        }
    }

    const handleUpdateSingle = (event) =>{
        var cartId = event.currentTarget.name
        var aftersplit = cartId.split("-")
        var getlastCartId = aftersplit.slice(-1)
        addSessions(parseInt(getlastCartId[0]), updatedQty);
    }

    return (
        <div>
            <NavBar/>
            <div className="flex justify-center my-12">
                <div className="flex-1 p-6 md:flex md:container md:mx-auto">
                            <div className="p-8 bg-gray-100 rounded-3xl lg:w-1/2 mx-auto">
                                <table className="w-full text-sm lg:text-base" cellSpacing="0">
                                    <thead>
                                        <tr className="h-12 uppercase">
                                            <th className="hidden md:table-cell"></th>
                                            <th className="text-left">Product</th>
                                            <th className="lg:text-right text-left lg:pl-0">
                                            <span className="lg:hidden" title="Quantity">Qty</span>
                                            <span className="hidden lg:inline">Quantity</span>
                                            </th>
                                            <th className="hidden text-right md:table-cell">Unit price</th>
                                            <th className="text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        {
                                            
                                            Object.keys(sessionCartData).map((key,index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td className="hidden pb-4 md:table-cell">
                                                            <a href="#">
                                                                <img src="https://limg.app/i/Calm-Cormorant-Catholic-Pinball-Blaster-yM4oub.jpeg" className="w-20 rounded" alt="Thumbnail" />
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a href="#">
                                                                <div className="w-1/2 truncate md:w-full">
                                                                    <span className="mb-2">{sessionCartData[key].name}</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <div>
                                                                        <span className="bg-green-500 text-white font-bold py-1 px-3 rounded text-sm">
                                                                            x {sessionCartData[key].quantity}
                                                                        </span>
                                                                    </div>
                                                                    <div className="ml-2">
                                                                        <button onClick={handleDelete} name={sessionCartData[key].id} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </td>
                                                        <td className="justify-center md:justify-end md:flex mt-6">
                                                            <div className="flex justify-between w-20 h-10">
                                                                <div className="flex" >
                                                                    <input value={updatedAllQty[key] || 1} placeholder="Qty" name={sessionCartData[key].id} onChange={refreshQty} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded pl-4 leading-tight focus:outline-none focus:bg-white" id="sessionQty" type="number" min="1" />
                                                                    <button name={`cart-item-${sessionCartData[key].id}`} onClick={handleUpdateSingle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="hidden text-right md:table-cell">
                                                            <span className="text-sm lg:text-base font-medium">
                                                                RM {sessionCartData[key].price}   
                                                            </span>
                                                        </td>
                                                        <td className="text-right">
                                                            <span className="text-sm lg:text-base font-medium">
                                                                RM {sessionCartData[key].id == afterUpdate['newItemId'] ? afterUpdate['newPrice']: sessionCartData[key].attributes.total}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                {
                                    sessionCartData == "" ? 
                                    null : 
                                    <div className="mt-10 flex justify-end">
                                        <button onClick={handleUpdateAll} className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Update All</button>
                                        <button onClick={handleClearAll} className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Clear Cart</button>
                                    </div>
                                }
                                
                            </div>
                            
                        <hr className="pb-6 mt-6"/>
                        <div className="my-4 mt-6 lg:flex-col mx-auto">
                            <div className="lg:px-2 lg:w-full">
                                <div className="p-4 bg-gray-100 rounded-full">
                                    <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Subtotal
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        RM {subtotal}
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            Tax (GST)
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            6%
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            Shipping
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            FREE
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            Total
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            RM {subtotalTax}
                                        </div>
                                    </div>
                                    <Link to="/payment">
                                        <button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                                        <span className="ml-2 mt-5px">Procceed to checkout</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:px-2 lg:w-full">
                                <div className="p-4 bg-gray-100 rounded-full">
                                    <h1 className="ml-2 font-bold uppercase">Coupon Code</h1>
                                </div>
                                <div className="p-4">
                                    <div className="justify-center md:flex">
                                    <form action="" method="POST">
                                        <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                                            <input type="coupon" name="code" id="coupon" placeholder="Apply coupon"
                                                    className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"/>
                                            <button type="submit" className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none">
                                                <svg aria-hidden="true" data-prefix="fas" data-icon="gift" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"/></svg>
                                                <span className="font-medium ml-2">APPLY</span>
                                            </button>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Checkout;






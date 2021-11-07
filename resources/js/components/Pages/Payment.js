import React, { useState, useEffect } from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";

function Payment(props) {
    const [authUser, setAuthUser] = useState([])
    const [noAuth, setNoAuth] = useState("")
    const [subtotal, setSubtotal] = useState([])
    const [sessionCartData, setSessionCartData] = useState([])
    
    //card info
    const [cardCvc, setCardCvc] = useState("")
    const [cardExpiry, setCardExpiry] = useState("")
    const [cardNumber, setCardNumber] = useState("")  

    //payment success notifications
    const [paySuccess, setPaySuccess] = useState(false);
    const handleOpen= () => setPaySuccess(true);
    const handleClose = () => setPaySuccess(false);

    let history = useHistory();
    

    const authFunc = () => {
        let authList = document.cookie
                .split('; ')
                .find(row => row.startsWith('authToken='))

        let authToken = ""

        if(document.cookie.indexOf(authList) == -1){
            setNoAuth(document.cookie.indexOf(authList))
        } else {
            authToken = authList.split('=')[1];
        }
        return authToken
    }

    useEffect(() =>{
        const authTokenUsage = authFunc()
        let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

        axios({
            method: 'GET',
            url:'/api/auth/user-profile',
            headers: authHeaders
            }).then((response) =>{
                setAuthUser(response.data);
        })

        axios({
            method: 'GET',
            url:'/api/cart/viewSession',
            headers:authHeaders
            }).then((response) =>{
                setSessionCartData(response.data.data);
                setSubtotal(response.data.subtotal);
        })
    },[])

    const cardSubmit = () => {
        const formDetails = {
            'number':cardNumber,
            'expiry':cardExpiry,
            'cvc':cardCvc
        }
        return formDetails;
    }


    const handleExistSubmit = (stripeId) => {
        const cardDetails = cardSubmit();
        const cardExpiry = cardDetails.expiry
        const cardConvert = cardExpiry.match(/.{1,2}/g)
        const authTokenUsage = authFunc()
        let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

        const modalRedirect = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        axios({
            method: 'POST',
            url:'/api/pay_stripe/create_payment_method',
            params:{
                'card_number' : cardDetails.number,
                'exp_month' : cardConvert[0],
                'exp_year' : "20" + cardConvert[1],
                'cvc' : cardDetails.cvc
            },
            headers:authHeaders
        }).then((response)=>{
            const stripeTotal = subtotal*100
            axios({
                method:'POST',
                url:'/api/pay_stripe/transaction',
                params:{
                    'amount':stripeTotal,
                    'customer':authUser.stripe_id ? authUser.stripe_id : stripeId,
                    'payment_method': response.data.pay_method.id
                },
                headers:authHeaders
            }).then((response)=>{
                axios({
                    method:'POST',
                    url:'/api/orders/add',
                    params:{
                        'amount':subtotal,
                        'status':'fulfilled'
                    },
                    headers:authHeaders
                }).then((response)=>{
                    const order_id = response.data.data.id
                    Object.keys(sessionCartData).map(function (key) {
                        axios({
                            method: 'POST',
                            url: '/api/order_items/add',
                            params: {
                            order_id: order_id,
                            items_id: sessionCartData[key].id,
                            quantity: sessionCartData[key].quantity,
                            amount: sessionCartData[key].price,
                            status: "fulfilled"
                            },
                            headers: authHeaders
                        }).then(() => {
                            setPaySuccess(true);
                            modalRedirect(5000).then(() => {
                                axios({
                                    method: 'POST',
                                    url:'/api/cart/delSession',
                                    headers: authHeaders
                                });
                                history.push("/");
                            })
                        })
                    })
                })
            })
        })
    }
    
    const handleNewSubmit = () => {
        const authTokenUsage = authFunc()
        let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

        axios({
            method:'POST',
            url:'/api/pay_stripe/create_customer',
            headers:authHeaders
        }).then((response) =>{
            console.log(response)
            handleExistSubmit(response.data.id)
        })

    }

    //Payment Success Modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    return(
            <div>
                <NavBar />
                <div className="flex-1 md:flex md:container md:mx-auto">
                    
                    <div className="mx-auto max-w-3xl w-full min-h-full flex justify-center px-5 py-5 mt-2">
                        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                            <div className="w-full p-6 md:p-16">
                                <div className="text-left mb-10">
                                    <h1 className="font-bold text-3xl uppercase text-black">checkout</h1>
                                    <p className="mt-3">billing details</p>
                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-5">
                                            <label className="text-xs font-semibold px-1">Full Name</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                {
                                                    noAuth == -1 ? 
                                                        <input  type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Full Name" required/>
                                                    :
                                                        <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.name}>{authUser.name}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-3 mb-5">
                                            <label className="text-xs font-semibold px-1">Email</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                {
                                                    noAuth == -1 ?
                                                        <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Email" required/>
                                                    :
                                                        <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.email}>{authUser.email}</span>
                                                }
                                                
                                            </div>
                                        </div>
                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label  className="text-xs font-semibold px-1">Address</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                </div>
                                                { 
                                                    noAuth == -1 ?
                                                        <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Address" required/>   
                                                    :
                                                        <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.address}>{authUser.address}</span>
                                                }  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-5">
                                            <label className="text-xs font-semibold px-1">State</label>
                                            <div className="flex">
                                                {
                                                    noAuth == -1 ?
                                                        <select className="p-2 w-full" required>
                                                            <option defaultValue="Johor">Johor</option>
                                                            <option defaultValue="Kedah">Kedah</option>
                                                            <option defaultValue="Kelantan">Kelantan</option>
                                                            <option defaultValue="Kuala Lumpur">Kuala Lumpur</option>
                                                            <option defaultValue="Labuan">Labuan</option>
                                                            <option defaultValue="Melaka">Melaka</option>
                                                            <option defaultValue="Negeri Sembilan">Negeri Sembilan</option>
                                                            <option defaultValue="Pahang">Pahang</option>
                                                            <option defaultValue="Penang">Penang</option>
                                                            <option defaultValue="Perak">Perak</option>
                                                            <option defaultValue="Perlis">Perlis</option>
                                                            <option defaultValue="Putrajaya">Putrajaya</option>
                                                            <option defaultValue="Sabah">Sabah</option>
                                                            <option defaultValue="Sarawak">Sarawak</option>
                                                            <option defaultValue="Selangor">Selangor</option>
                                                            <option defaultValue="Terengganu">Terengganu</option>
                                                        </select> :
                                                        <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.state}>{authUser.state}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-3 mb-5">
                                            <label className="text-xs font-semibold px-1">Country</label>
                                            <div className="flex">
                                                    {
                                                        noAuth == -1 ?
                                                            <select className="p-2 w-full" required>
                                                                <option defaultValue="Singapore">Singapore</option>
                                                                <option defaultValue="Malaysia" >Malaysia</option>
                                                            </select>
                                                        :
                                                            <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.country}>{authUser.country}</span>
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-5">
                                            <label  className="text-xs font-semibold px-1">Postcode</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                {
                                                    noAuth == -1 ?
                                                        <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Postcode" required/>
                                                    :
                                                        <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.postcode}>{authUser.postcode}</span>
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-3 mb-5">
                                            <label  className="text-xs font-semibold px-1">Phone Number</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                {
                                                    noAuth == -1 ?
                                                        <input  type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Phone Number" required/>
                                                    :
                                                        <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.phone_number}>{authUser.phone_number}</span>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            {/* <div>
                                <p className="font-bold text-black mt-3">Shipping Methods</p>
                                <div className="block">
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio" name="radio" defaultValue="1" />
                                            <span className="ml-2">Free Shipping - RM100 and above</span>
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio" name="radio" defaultValue="2" />
                                            <span className="ml-2">Charges RM8 - RM100 and below</span>
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            <div>
                                <p className="font-bold text-black mt-3">Payment Methods</p>
                                <div className="block">
                                    {/* Payment Card */}
                                    
                                        <label className="relative w-full flex flex-col">
                                            <span className="font-bold mb-3">Card number</span>
                                            <input onChange={e => setCardNumber(e.target.value)} defaultValue={cardNumber} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_number" maxLength='16' placeholder="0000 0000 0000" required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </label>

                                        <label className="relative flex-1 flex flex-col">
                                            <span className="font-bold mb-3">Expire date</span>
                                            <input onChange={e => setCardExpiry(e.target.value)} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="expire_date" placeholder="MM/YY" maxLength='4' required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </label>

                                        <label className="relative flex-1 flex flex-col">
                                            <span className="font-bold flex items-center gap-3 mb-3">
                                            CVC/CVV
                                            <span className="relative group">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            </span>
                                            <input onChange={e => setCardCvc(e.target.value)} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_cvc" placeholder="&bull;&bull;&bull;" maxLength='3' required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </label>
                                        <button onClick={ authUser.stripe_id ? handleExistSubmit : handleNewSubmit } className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                            <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                                            <span className="ml-2 mt-5px">Place Order</span>
                                        </button>

                                        <Modal
                                            open={paySuccess}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <span className="text-green-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </span>
                                                <p className="mt-4 text-3xl uppercase text-center">
                                                    payment success
                                                </p>
                                                <p className="mt-4 text-center uppercase">
                                                    redirect to homepage
                                                </p>
                                            </Box>
                                        </Modal>
                                </div>
                            </div>
                            </div> 
                        </div>
                    </div>
                    <div className="mx-auto max-w-xl w-full min-h-full flex justify-center px-5 py-5 mt-2">
                        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                            <div className="w-full py-10 px-5 md:px-10">
                                <div className="text-left mb-10">
                                    <div className="p-6 lg:w-full mx-auto">
                                        <table className="w-full text-sm lg:text-base" cellSpacing="0" cellPadding="1" >
                                            <thead>
                                                <tr className="h-12 uppercase">
                                                    <th className="hidden md:table-cell"></th>
                                                    <th className="text-left">Product</th>
                                                    <th className="lg:text-right text-left lg:pl-0">
                                                    <span className="lg:hidden" title="Quantity">Qty</span>
                                                    <span className="hidden lg:inline">Quantity</span>
                                                    </th>
                                                    <th className="text-right">Total price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.keys(sessionCartData).map((key)=>
                                                        <tr key={sessionCartData[key].id}> 
                                                            <td className="hidden pb-4 md:table-cell">
                                                                <a href="#">
                                                                    <img src="https://limg.app/i/Calm-Cormorant-Catholic-Pinball-Blaster-yM4oub.jpeg" className="w-20 rounded" alt="Thumbnail" />
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <a href="#">
                                                                    <p className="mb-2">{sessionCartData[key].name}</p>
                                                                </a>
                                                            </td>
                                                            <td className="justify-center md:justify-end md:flex mt-6">
                                                                <div className="w-20 h-10">
                                                                    <div className="relative flex flex-row w-full h-8">
                                                                        <span className="text-sm lg:text-base font-medium">
                                                                            RM {sessionCartData[key].price}   
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <span className="text-sm lg:text-base font-medium">
                                                                    RM {sessionCartData[key].attributes.total}   
                                                                </span>
                                                            </td>
                                                        </tr> 
                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    <div key={sessionCartData['user']} className="my-4 mt-3 lg:flex-col mx-auto">
                                        <div className="lg:px-2 lg:w-full">
                                            <div className="p-4 bg-gray-100 rounded-full">
                                                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                                            </div>
                                            <div className="p-4">
                                                <div  className="flex justify-between border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                    Subtotal
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        RM {subtotal}   
                                                    </div>
                                                </div>
                                                <div className="flex justify-between pt-4 border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Shipping
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        2,976.55€
                                                    </div>
                                                </div>

                                                <div className="flex justify-between pt-4 border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Tax
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        2,976.55€
                                                    </div>
                                                </div>

                                                <div className="flex justify-between pt-4 border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Total
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        RM {subtotal}   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}


export default Payment;
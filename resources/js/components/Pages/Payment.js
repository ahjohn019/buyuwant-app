import React, { useState, useEffect } from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import AuthToken from '../UI/Authentication/AuthToken';

function Payment(props) {
    const [authUser, setAuthUser] = useState([])
    const [authAddress, setAuthAddress] = useState([])
    const [subtotal, setSubtotal] = useState([])
    const [subtotalTax, setSubtotalTax] = useState("")
    const [sessionCartData, setSessionCartData] = useState([])

    //address info
    const [addressDetails, setAddressDetails] = useState([])
    
    //card info
    const [cardInfo, setCardInfo] = useState({
        'card_number':'',
        'exp_month':'',
        'exp_year':'',
        'cvc':''
    })

    //cardInfo Error Message
    const [cardNumError, setCardNumError] = useState("")
    const [cardExpMonthError, setCardExpMonthError] = useState("")
    const [cardExpYearError, setCardExpYearError] = useState("")
    const [cardExpCvcError, setCardExpCvcError] = useState("")

    //addressInfo Error message
    const [addressErrorInfo, setAddressErrorInfo] = useState("")

    //payment success notifications
    const [paySuccess, setPaySuccess] = useState(false);
    const handleClose = () => setPaySuccess(false);

    let history = useHistory();
    let authTokenUsage = AuthToken()
    let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

    useEffect(() =>{
        axios({
            method: 'GET',
            url:'/api/auth/user-profile',
            headers: authHeaders
            }).then((response) =>{
                setAuthUser(response.data);
                setAuthAddress(response.data.user_addresses)
        })

        axios({
            method: 'GET',
            url:'/api/cart/viewSession',
            headers:authHeaders
            }).then((response) =>{
                setSessionCartData(response.data.data);
                setSubtotal(response.data.subtotal);
                setSubtotalTax(response.data.subtotalWithTax);
        })
    },[])

    const onCardSubmit = prop => event=> {
        event.preventDefault();
        setCardInfo({...cardInfo,[prop]:event.target.value});
    }

    const handleChangeAddress = (event) => {
        const userAddressId = event.target.value;

        axios({
            method: 'GET',
            url:`/api/auth/show-address/${userAddressId}`,
            headers: {
                'Authorization': 'Bearer '+ authTokenUsage
            }}).then((response) =>{
                setAddressDetails(response.data)
                
        }).catch((error) =>{
            console.log(error)
        })
    }


    const handleExistSubmit = (stripeId) => {
        const modalRedirect = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        axios({
            method: 'POST',
            url:'/api/pay_stripe/create_payment_method',
            params:{
                'card_number' : cardInfo.card_number, 
                'exp_month' : cardInfo.exp_month, 
                'exp_year' : cardInfo.exp_year, 
                'cvc' : cardInfo.cvc, 
                'address_line':addressDetails.address_line,
                'postcode': addressDetails.postcode,
                'state':addressDetails.state,
                'phone_number':addressDetails.phone_number   
            },
            headers:authHeaders
        }).then((response)=>{
            const stripeTotal = subtotalTax*100
            const stripeFinalTotal = Math.round(stripeTotal)

            axios({
                method:'POST',
                url:'/api/pay_stripe/transaction',
                params:{
                    'amount':stripeFinalTotal,
                    'customer':authUser.stripe_id ? authUser.stripe_id : stripeId,
                    'payment_method': response.data.pay_method.id,
                    'ship_country':addressDetails.country,
                    'ship_addrline':addressDetails.address_line,
                    'ship_postalcode':addressDetails.postcode,
                    'ship_state':addressDetails.state,
                    'ship_phonenum':addressDetails.phone_number
                },
                headers:authHeaders
            }).then((response)=>{
                axios({
                    method:'POST',
                    url:'/api/orders/add',
                    params:{
                        'amount':stripeFinalTotal,
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
                            modalRedirect(3000).then(() => {
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
        }).catch(err => {
            setCardNumError(err.response.data.card_number)
            setCardExpMonthError(err.response.data.exp_month)
            setCardExpYearError(err.response.data.exp_year)
            setCardExpCvcError(err.response.data.cvc)
            setAddressErrorInfo(err.response.data.address_line)
        })
    }


    const handleNewSubmit = () => {
        axios({
            method:'POST',
            url:'/api/pay_stripe/create_customer',
            headers:authHeaders,
            params:{
                'address_line':addressDetails.address_line,
                'postcode': addressDetails.postcode,
                'state':addressDetails.state,
                'phone_number':addressDetails.phone_number 
            }
        }).then((response) =>{
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
                            <div className="w-full p-6 md:p-8">
                                <div className="text-left mb-5">
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
                                                <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.name}>{authUser.name}</span>
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
                                                
                                                    <span className="bg-white px-1 py-3 pl-3 font-semibold text-black border-2 rounded-lg w-full" name={authUser.email}>{authUser.email}</span>
                                                
                                            </div>
                                        </div>
                                        
                                </div>
                                <div className="w-full mb-5">
                                    <label className="text-xs font-semibold px-1">Address</label>
                                    {
                                        authAddress.map((address) =>
                                            <div className="mt-2">
                                                <label className="inline-flex items-center">
                                                <input onChange={handleChangeAddress} type="radio" className="form-radio" name="radio" value={address.id} />
                                                    <span className="ml-2">{address.address_line}</span>
                                                    <span className="ml-2">{address.postcode}</span>
                                                    <span className="ml-2">{address.state}</span>
                                                    <span className="ml-2">{address.country}</span>
                                                    <span className="ml-2">{address.phone_number}</span>
                                                </label>
                                            </div>
                                        )
                                    }                
                                </div>
                                <div className="text-red-500 text-sm">
                                    {addressErrorInfo}
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
                                            <input onChange={onCardSubmit('card_number')}  className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_number" maxLength='16' placeholder="0000 0000 0000" required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </label>
                                        <p className="text-red-500 text-sm">{cardNumError}</p>

                                        <label className="relative flex-1 flex flex-col">
                                            <span className="font-bold mb-3">Month</span>
                                            <input onChange={onCardSubmit('exp_month')} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="expire_date" placeholder="MM" maxLength='2' required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </label>
                                        <p className="text-red-500 text-sm">{cardExpMonthError}</p>

                                        <label className="relative flex-1 flex flex-col">
                                            <span className="font-bold mb-3">Year</span>
                                            <input onChange={onCardSubmit('exp_year')} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="expire_date" placeholder="YYYY" maxLength='4' required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </label>
                                        <p className="text-red-500 text-sm">{cardExpYearError}</p>

                                        <label className="relative flex-1 flex flex-col">
                                            <span className="font-bold flex items-center gap-3 mb-3">
                                            CVC/CVV
                                            <span className="relative group">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            </span>
                                            <input onChange={onCardSubmit('cvc')} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_cvc" placeholder="&bull;&bull;&bull;" maxLength='3' required/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </label>
                                        <p className="text-red-500 text-sm">{cardExpCvcError}</p>

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
                                                        Tax (GST)
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        6%
                                                    </div>
                                                </div>

                                                <div className="flex justify-between pt-4 border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Shipping
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        FREE
                                                    </div>
                                                </div>

                                                <div className="flex justify-between pt-4 border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Total
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        RM {subtotalTax}   
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
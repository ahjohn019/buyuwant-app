import React, { Component } from 'react';
import NavBar from '../UI/NavBar/NavBar.js';

class Payment extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="flex-1 md:flex md:container md:mx-auto">
                    <div className="mx-auto max-w-3xl w-full min-h-full flex justify-center px-5 py-5 mt-2">
                        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                            <div className="w-full py-10 px-10">
                                <div className="text-left mb-10">
                                    <h1 className="font-bold text-3xl uppercase text-black">checkout</h1>
                                    <p className="mt-3">billing details</p>
                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-5">
                                            <label  className="text-xs font-semibold px-1">Full Name</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Full Name"/>
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
                                                <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Email"/>
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
                                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-5">
                                            <label className="text-xs font-semibold px-1">State</label>
                                            <div className="flex">
                                                <select className="p-2 w-full">
                                                    <option value="Johor">Johor</option>
                                                    <option value="Kedah">Kedah</option>
                                                    <option value="Kelantan">Kelantan</option>
                                                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                                                    <option value="Labuan">Labuan</option>
                                                    <option value="Melaka">Melaka</option>
                                                    <option value="Negeri Sembilan">Negeri Sembilan</option>
                                                    <option value="Pahang">Pahang</option>
                                                    <option value="Penang">Penang</option>
                                                    <option value="Perak">Perak</option>
                                                    <option value="Perlis">Perlis</option>
                                                    <option value="Putrajaya">Putrajaya</option>
                                                    <option value="Sabah">Sabah</option>
                                                    <option value="Sarawak">Sarawak</option>
                                                    <option value="Selangor">Selangor</option>
                                                    <option value="Terengganu">Terengganu</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-3 mb-5">
                                            <label className="text-xs font-semibold px-1">Country</label>
                                            <div className="flex">
                                                <select className="p-2 w-full" >
                                                    <option value="none" >None</option>
                                                    <option value="Malaysia" >Malaysia</option>
                                                </select>
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
                                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Postcode"/>
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
                                                <input  type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            </div>
                            <div>
                                <p className="font-bold text-black mt-3">Shipping Methods</p>
                                <div class="block">
                                    <div class="mt-2">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio" name="radio" value="1" />
                                            <span class="ml-2">Free Shipping - RM100 and above</span>
                                        </label>
                                    </div>
                                    <div class="mt-2">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio" name="radio" value="2" />
                                            <span class="ml-2">Charges RM8 - RM100 and below</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-black mt-3">Payment Methods</p>
                                <div class="block">
                                    <div class="mt-2">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio" name="radio" value="1" />
                                            <span class="ml-2">Cash On Delivery</span>
                                        </label>
                                    </div>
                                    <div class="mt-2">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio" name="radio" value="2" />
                                            <span class="ml-2">Credit Card</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </div> 
                        </div>
                    </div>
                    <div className="mx-auto max-w-3xl w-full min-h-full flex justify-center px-5 py-5 mt-2">
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
                                                <tr>
                                                    <td className="hidden pb-4 md:table-cell">
                                                        <a href="#">
                                                            <img src="https://limg.app/i/Calm-Cormorant-Catholic-Pinball-Blaster-yM4oub.jpeg" className="w-20 rounded" alt="Thumbnail" />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a href="#">
                                                            <p className="mb-2">Earphone</p>
                                                        </a>
                                                    </td>
                                                    <td className="justify-center md:justify-end md:flex mt-6">
                                                        <div className="w-20 h-10">
                                                            <div className="relative flex flex-row w-full h-8">
                                                                
                                                            <input type="number" value="2" 
                                                            className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="text-sm lg:text-base font-medium">
                                                            20.00€
                                                        </span>
                                                    </td>
                                                </tr> 
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="my-4 mt-3 lg:flex-col mx-auto">
                                        <div className="lg:px-2 lg:w-full">
                                            <div className="p-4 bg-gray-100 rounded-full">
                                                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between border-b">
                                                    <div className="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                    Subtotal
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                    148,827.53€
                                                    </div>
                                                </div>
                                                <div className="flex justify-between pt-4 border-b">
                                                    <div className="flex lg:px-4 lg:py-2 m-2 text-sm font-bold text-gray-800">
                                                        <form action="" method="POST">
                                                        <button type="submit" className="mr-2 mt-1 lg:mt-2">
                                                            <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" className="w-4 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg>
                                                        </button>
                                                        </form>
                                                        Coupon "90off"
                                                    </div>
                                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-green-700">
                                                        -133,944.77€
                                                    </div>
                                                </div>
                                                <div class="flex justify-between pt-4 border-b">
                                                    <div class="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        New Subtotal
                                                    </div>
                                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        14,882.75€
                                                    </div>
                                                </div>
                                                <div class="flex justify-between pt-4 border-b">
                                                    <div class="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Tax
                                                    </div>
                                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        2,976.55€
                                                    </div>
                                                </div>
                                                <div class="flex justify-between pt-4 border-b">
                                                    <div class="lg:px-4 lg:py-2 m-2 text-sm font-bold text-center text-gray-800">
                                                        Total
                                                    </div>
                                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900">
                                                        17,859.3€
                                                    </div>
                                                </div>
                                                <a href="#">
                                                    <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                                    <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                                                    <span class="ml-2 mt-5px">Place Order</span>
                                                    </button>
                                                </a>
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
}

export default Payment;
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from '../NavBar/NavBar';
import FlashMessage from 'react-flash-message';

const Register =() => {
        const [startDate, setStartDate] = useState(new Date());
        const [userDetails, setUserDetails] = useState(
           { 
               name:'', 
               email:'',
               gender:'male',
               dob:startDate,
               phone_number:''
           }
        );

        const [addrDetails, setAddrDetails] = useState(
            {
                address_line:'',
                state:'',
                country:'Johor',
                phone_number:'',
                postcode:''
            }
        );
        
        const [regErrorName, setRegErrorName] = useState("")
        const [regErrorEmail, setRegErrorEmail] = useState("")
        const [regErrorPhone, setRegErrorPhone] = useState("")
        const [regErrorPwd, setRegErrorPwd] = useState("")
        const [regSuccessNotification, setRegSuccessNotification] = useState(false)
        
        const onRegister  = prop => event => {
            event.preventDefault();
            setUserDetails({ ...userDetails, [prop]: event.target.value });
            setAddrDetails({ ...addrDetails, [prop]: event.target.value});
        }
        

        const onRegisterSubmit = async () => {
            await axios.post('/api/auth/register',userDetails).then(function(response) {
                    setRegSuccessNotification(true)
                }).catch(function(err) {
                    setRegErrorName(err.response.data.name)
                    setRegErrorEmail(err.response.data.email)
                    setRegErrorPhone(err.response.data.phone_number)
                    setRegErrorPwd(err.response.data.password)
                })
            }

        return (
            <div>
            <NavBar />
                <div className="max-w-3xl min-h-full flex justify-center px-5 py-5 m-auto mt-5">
                    
                    <form onSubmit={onRegisterSubmit}>
                    {
                        regSuccessNotification && (
                            <FlashMessage duration={5000}>
                                <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                    <div className="flex">
                                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                        <div>
                                            <p className="font-light">Registered successfully.</p>
                                        </div>
                                    </div>
                                </div>
                            </FlashMessage>
                        )
                    }
                    
                    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                        
                        <div className="w-full py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl uppercase text-black">register</h1>
                                <p className="mt-3">Enter your information to register</p>
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
                                            <input onChange={onRegister('name')} type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Full Name"/>
                                            
                                        </div>
                                        <div className="text-red-500 text-sm">
                                            {regErrorName}
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
                                            <input onChange={onRegister('email')} type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Email"/>
                                        </div>
                                        <div className="text-red-500 text-sm">
                                            {regErrorEmail}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Gender</label>
                                        <div className="flex">
                                            <select className="p-2 w-full" onChange={onRegister('gender')}>
                                                <option value="male" onChange={onRegister('gender')}>Male</option>
                                                <option value="female" onChange={onRegister('gender')}>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Date Of Birth</label>
                                        <div className="flex">
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="p-2 w-full"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">State</label>
                                        <div className="flex">
                                            <select className="p-2 w-full" onChange={onRegister('state')}  >
                                                <option value="Johor" onChange={onRegister('state')}>Johor</option>
                                                <option value="Kedah" onChange={onRegister('state')}>Kedah</option>
                                                <option value="Kelantan" onChange={onRegister('state')}>Kelantan</option>
                                                <option value="Kuala Lumpur" onChange={onRegister('state')}>Kuala Lumpur</option>
                                                <option value="Labuan" onChange={onRegister('state')}>Labuan</option>
                                                <option value="Melaka" onChange={onRegister('state')}>Melaka</option>
                                                <option value="Negeri Sembilan" onChange={onRegister('state')}>Negeri Sembilan</option>
                                                <option value="Pahang" onChange={onRegister('state')}>Pahang</option>
                                                <option value="Penang" onChange={onRegister('state')}>Penang</option>
                                                <option value="Perak" onChange={onRegister('state')}>Perak</option>
                                                <option value="Perlis" onChange={onRegister('state')}>Perlis</option>
                                                <option value="Putrajaya" onChange={onRegister('state')}>Putrajaya</option>
                                                <option value="Sabah" onChange={onRegister('state')}>Sabah</option>
                                                <option value="Sarawak" onChange={onRegister('state')}>Sarawak</option>
                                                <option value="Selangor" onChange={onRegister('state')}>Selangor</option>
                                                <option value="Terengganu" onChange={onRegister('state')}>Terengganu</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Country</label>
                                        <div className="flex">
                                            <select className="p-2 w-full" onChange={onRegister('country')} >
                                                <option value="Malaysia" onChange={onRegister('country')}>Malaysia</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label  className="text-xs font-semibold px-1">Phone Number</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <input onChange={onRegister('phone_number')} type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Phone Number" />
                                        </div>
                                        <div className="text-red-500 text-sm">
                                            {regErrorPhone}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label  className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input onChange={onRegister('password')} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Password"/>
                                        </div>
                                        <div className="text-red-500 text-sm">
                                            {regErrorPwd}
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label  className="text-xs font-semibold px-1">Password Confirmation</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input onChange={onRegister('password_confirmation')} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Password Confirmation"/>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="remember" className="flex items-center w-1/2">
                                    <input type="checkbox" name="" id="" className="mr-1 bg-white shadow" defaultChecked ></input>
                                    <span className="text-sm text-gray-700 pt-1">I have read Terms and Conditions</span>
                                </label>
                            </div>

                            <div className="flex justify-center items-center w-full">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onRegisterSubmit} type="button">
                                    Sign Up
                                </button>
                            </div>

                        </div>
                    </div>
                    </form>
                </div>
                
            </div>
        );
    }


export default Register;
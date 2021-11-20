import React, { useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function addUserAddress (){
    const [authUser, setAuthUser] = useState([]);
    const [addrDetails, setAddrDetails] = useState(
        {
            address_line:'',
            state:'',
            country:'',
            phone_number:'',
            postcode:''
        }
    );

    useEffect(() =>{
        let authList = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))

        if(document.cookie.indexOf(authList) == -1){
            console.log("Need authorized only can add to cart")
        } else {
            let authToken = authList.split('=')[1];

            axios({
                method:'GET',
                url:'/api/auth/user-profile',
                headers: {
                    'Authorization': 'Bearer '+ authToken
                }}).then((response) =>{
                    setAuthUser(response.data)
                    setAuthAddress(response.data.user_addresses)
            })

        }
    },[])


    const onRegisterAddress = prop => event => {
        event.preventDefault();
        setAddrDetails({...addrDetails, [prop]:event.target.value});
    }

    const addressSubmit = () => {
        axios.post('/api/auth/store-address',addrDetails,{params:{user_id:authUser.id}}).then(function(response) {
            console.log(response.data);
        })
    }


    //Add Address Modal
    const addressStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    //Open Address Modal
    const [openAddress, setOpenAddress] = useState(false);
    const handleOpenAddress = () => setOpenAddress(true);
    const handleCloseAddress = () => setOpenAddress(false);

    return(
        <div>
            <button className="bg-blue-200 hover:bg-blue-500 w-36 h-10 rounded-lg uppercase" type="submit" onClick={handleOpenAddress}>
                Add Address
            </button>
            <Modal open={openAddress} onClose={handleCloseAddress} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={addressStyle}>
                    <form className="w-full max-w-lg" onSubmit={addressSubmit}>
                        <div className="flex flex-wrap -mx-6 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="address-line">
                                    Address Line
                                </label>
                                <input onChange={onRegisterAddress('address_line')} className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="address-line" type="text" placeholder="Address Line" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="address-postcode">
                                    Postcode
                                </label>
                                <input onChange={onRegisterAddress('postcode')} className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="address-postcode" type="text" placeholder="Postcode" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address-state">
                                    State
                                </label>
                                <div className="relative">
                                    <select onChange={onRegisterAddress('state')} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address-state">
                                        <option onChange={onRegisterAddress('state')} value="Johor">Johor</option>
                                        <option onChange={onRegisterAddress('state')} value="Kedah">Kedah</option>
                                        <option onChange={onRegisterAddress('state')} value="Kelantan">Kelantan</option>
                                        <option onChange={onRegisterAddress('state')} value="Kuala Lumpur">Kuala Lumpur</option>
                                        <option onChange={onRegisterAddress('state')} value="Labuan">Labuan</option>
                                        <option onChange={onRegisterAddress('state')} value="Melaka">Melaka</option>
                                        <option onChange={onRegisterAddress('state')} value="Negeri Sembilan">Negeri Sembilan</option>
                                        <option onChange={onRegisterAddress('state')} value="Pahang">Pahang</option>
                                        <option onChange={onRegisterAddress('state')} value="Penang">Penang</option>
                                        <option onChange={onRegisterAddress('state')} value="Perak">Perak</option>
                                        <option onChange={onRegisterAddress('state')} value="Perlis">Perlis</option>
                                        <option onChange={onRegisterAddress('state')} value="Putrajaya">Putrajaya</option>
                                        <option onChange={onRegisterAddress('state')} value="Sabah">Sabah</option>
                                        <option onChange={onRegisterAddress('state')} value="Sarawak">Sarawak</option>
                                        <option onChange={onRegisterAddress('state')} value="Selangor">Selangor</option>
                                        <option onChange={onRegisterAddress('state')} value="Terengganu">Terengganu</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    Country
                                </label>
                                <div className="relative">
                                    <select onChange={onRegisterAddress('country')} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address-state">
                                        <option onChange={onRegisterAddress('country')} value="Singapore">Singapore</option>
                                        <option onChange={onRegisterAddress('country')} value="Malaysia">Malaysia</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="address-phonenum">
                                    Phone Number
                                </label>
                                <input onChange={onRegisterAddress('phone_number')} className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="address-phonenum" type="text" placeholder="Phone Number" />
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0 flex justify-center">
                                <button onClick={addressSubmit} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    Add Address
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default addUserAddress
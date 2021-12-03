import React, { useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import DataTable from 'react-data-table-component';
import AddAddresses from '../UI/Modal/UserAddress/AddAddress';
import EditAddress from '../UI/Modal/UserAddress/EditAddress';
import AuthToken from '../UI/Authentication/AuthToken';

export default function UserProfile (){
    const [orderList, setOrderList] = useState([]);
    const [authAddress, setAuthAddress] = useState([]);
    const [authId, setAuthId] = useState("");
    let authTokenUsage = AuthToken()

    useEffect(() =>{
        if(authTokenUsage.length <= 0){
            return null
        }

        axios({
            method: 'GET',
            url:'/api/orders',
            headers: { 
                'Authorization': 'Bearer '+ authTokenUsage
                }
            }).then((response) =>{
                setOrderList(response.data.orders)
        })

        axios({
            method:'GET',
            url:'/api/auth/user-profile',
            headers: {
                'Authorization': 'Bearer '+ authTokenUsage
            }}).then((response) =>{
                setAuthId(response.data.id)
                setAuthAddress(response.data.user_addresses)
        })
            
    },[])

    const handleDeleteAddress = (event) => {
        const addrId = event.currentTarget.value
        axios({
            method:'POST',
            url:`/api/auth/delete-address/${addrId}`,
            headers: {
                'Authorization': 'Bearer '+ authTokenUsage
            }}).then(() =>{
                window.location.reload(false)
        })
    }


    const columns = [
        { name:'Index', selector:row=>row.index,sortable:true},
        { name: 'orderid', selector:row=>row.orderid,sortable:true },
        { name: 'status', selector:row=>row.status,sortable:true },
        { name: 'total', selector:row=>row.total,sortable:true },
        { name: 'created_at', selector:row=>row.created_at,sortable:true }
    ]

    const orderListRow = orderList.map(function(orderList, index){ 
        let orderAmount = orderList.amount/100
        let finalAmount = orderAmount.toFixed(2)
        return{index: index+1, orderid:orderList.id, status:orderList.status, total:finalAmount, created_at:orderList.created_at}}
        )

    return(
        <div>
            <NavBar />
            <div className="container mx-auto w-4/5">
                <h1 className="text-3xl text-center leading-loose" >Order Details</h1>
                <div style={{ height: 450, width: '100%' }}>
                    <DataTable
                        columns={columns}
                        data={orderListRow}
                        pagination
                    />
                </div>
                <h1 className="text-3xl text-center leading-loose" >Profile</h1>
                <div className="flex justify-center"> 
                    <AddAddresses userProfileId={authId}/>
                </div>
                <div className="flex justify-center">
                    {
                        authAddress.map((address) =>
                            <div className="mx-4 my-5 border p-4">
                                <p>{address.address_line}</p>
                                <p>{address.postcode}</p>
                                <p>{address.state}</p>
                                <p>{address.country}</p>
                                <p>{address.phone_number}</p>
                                <div className="flex float-right">
                                    <EditAddress 
                                        userProfileAddrId={address.id} 
                                        userProfileId={authId} 
                                        userProfileAddrLine={address.address_line} 
                                        userProfilePostcode={address.postcode}
                                        userProfileState={address.state}
                                        userProfileCountry={address.country}
                                        userProfilePhoneNo={address.phone_number}
                                    />
                                    <div className="ml-4">
                                        <button onClick={handleDeleteAddress} className="bg-red-200 hover:bg-red-500 rounded-lg uppercase" value={address.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

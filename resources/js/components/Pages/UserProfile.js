import React, { useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import DataTable from 'react-data-table-component';
import AddAddresses from '../UI/Modal/AddAddress/AddAddress';

function UserProfile (){

    const [orderList, setOrderList] = useState([]);
    const [authAddress,setAuthAddress] = useState([]);

    useEffect(() =>{
      let authList = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('authToken='))

            if(document.cookie.indexOf(authList) == -1){
                console.log("Need authorized only can add to cart")
            } else {
                let authToken = authList.split('=')[1];

                axios({
                    method: 'GET',
                    url:'/api/orders',
                    headers: { 
                        'Authorization': 'Bearer '+ authToken
                        }
                    }).then((response) =>{
                        setOrderList(response.data.orders)
                })

                axios({
                    method:'GET',
                    url:'/api/auth/user-profile',
                    headers: {
                        'Authorization': 'Bearer '+ authToken
                    }}).then((response) =>{
                        setAuthAddress(response.data.user_addresses)
                })
            }
    },[])

    const columns = [
        { name:'Index', selector:row=>row.index,sortable:true},
        { name: 'orderid', selector:row=>row.orderid,sortable:true },
        { name: 'status', selector:row=>row.status,sortable:true },
        { name: 'total', selector:row=>row.total,sortable:true },
        { name: 'created_at', selector:row=>row.created_at,sortable:true }
    ]

    const orderListRow = orderList.map(function(orderList, index){ return{index: index+1, orderid:orderList.id, status:orderList.status, total:orderList.amount, created_at:orderList.created_at}})

    return(
        <div>
            <NavBar />
            <div className="container mx-auto w-4/5">
                <h1 className="text-3xl text-center leading-loose" >Order Details</h1>
                <div style={{ height: 300, width: '100%' }}>
                    <DataTable
                        columns={columns}
                        data={orderListRow}
                        pagination
                    />
                </div>
                <h1 className="text-3xl text-center leading-loose" >Profile</h1>
                <div className="flex justify-center"> 
                    <AddAddresses />
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
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfile
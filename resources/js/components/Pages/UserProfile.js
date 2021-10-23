import React, { useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import { DataGrid } from '@mui/x-data-grid';

function UserProfile (){

    const [orderList, setOrderList] = useState([]);

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
            }
    },[])

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'orderid', headerName: 'Order ID', width:150},
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'total', headerName: 'Total', width: 150 },
        { field: 'created_at', headerName: 'Created At', width: 200 }
    ];
    const orderListRow = orderList.map(function(orderList, index){ return{id: index+1, orderid:orderList.id, status:orderList.status, total:orderList.amount, created_at:orderList.created_at}})

    return(
        <div>
            <NavBar />
            <div className="container mx-auto w-1/2">
                <h1 className="text-3xl text-center leading-loose" >Order Details</h1>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={orderListRow}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                
            </div>
        </div>
    );
}

export default UserProfile
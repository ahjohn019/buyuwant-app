import React, { useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import { DataGrid } from '@mui/x-data-grid';

function UserProfile (){
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
                    url:'/api/order_items',
                    headers: { 
                        'Authorization': 'Bearer '+ authToken
                        }
                    }).then((response) =>{
                        console.log(response.data)
                })
            }
    },[])

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'orderid', headerName: 'Order ID', width:150},
        { field: 'items', headerName: 'Items', width: 130 },
        { field: 'qty', headerName: 'Qty', width: 100 },
        {
          field: 'amount',
          headerName: 'Amount',
          width: 150,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 130,
        },
      ];
      
      const rows = [
        { id: 1,orderid:'#1', items: 'Tefal Cooker', qty: 1, amount: 12, status:'fulfilled' },
        { id: 2,orderid:'#1', items: 'Tefal Cooker', qty: 2, amount: 24, status:'fulfilled' }
      ];


    return(
        <div>
            <NavBar />
            <div className="container">
                <h1>Order Details</h1>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
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
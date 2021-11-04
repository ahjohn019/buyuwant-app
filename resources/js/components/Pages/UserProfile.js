import React, { useState, useEffect} from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import { DataGrid } from '@mui/x-data-grid';
import DataTable from 'react-data-table-component';

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
            <div className="container mx-auto w-1/2">
                <h1 className="text-3xl text-center leading-loose" >Order Details</h1>
                <div style={{ height: 400, width: '100%' }}>
                    <DataTable
                        columns={columns}
                        data={orderListRow}
                        pagination
                    />
                </div>
                
            </div>
        </div>
    );
}

export default UserProfile
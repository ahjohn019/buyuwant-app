import React,{useEffect, useState} from 'react';
import Sidebar from '../../UI/Admin/Sidebar';
import DataTable from 'react-data-table-component';
import AuthToken from '../../Helper/AuthToken/AuthToken';
import {Link} from 'react-router-dom';

const AdminOrder = () => {
    const [orderList, setOrderList] = useState([])
    let authTokenUsage = AuthToken()
    let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const orderTotalQty = await axios.get(`/api/order_items/groupBy`, {headers: authHeaders});
                const orderOnlyGet = await axios.get(`/api/orders`, {headers: authHeaders})
                setOrderList({ orderTotalQtyGet : orderTotalQty.data.orders, orderItemsOnly : orderOnlyGet.data.orders});
            } catch(error){
                console.error(error)
            }
        }
        fetchData();
    },[])

    if(orderList.length <=0 ) return null

    console.log(orderList)

    const columns = [
        {
            name: 'Order Id',
            selector: row => row.order_id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.total_amount,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        { 
            name: 'Status', 
            selector: row => row.status, 
            sortable:true 
        },
        { 
            name: 'Created At', 
            selector: row => row.created_at,  
            sortable:true 
        },
        {
            name: 'Action',
            button: true, 
            cell:row=>(
                <div className="flex flex-col">
                    <Link to={{pathname:`/admin/order_details/${row.order_id}`}}>
                        <button className="my-2 bg-blue-500 hover:bg-blue-700 w-20 h-8 uppercase font-bold text-white rounded-lg text-sm ">Details</button>
                    </Link>
                </div>
            )
        }
    ];

    let final_order_list = orderList.orderTotalQtyGet.map((totalQty) => {
        var order_id_match = orderList.orderItemsOnly.find(index => totalQty.order_id === index.id);
        if(order_id_match){
            return {
                order_id: totalQty.order_id, 
                name:order_id_match.order_user.name, 
                total_amount:order_id_match.amount, 
                quantity:totalQty.total_quantity,
                status:order_id_match.status,
                created_at:order_id_match.created_at
            }    
        }
    }).filter(item => item !== undefined);

    return(
        <div>
            <Sidebar />
            <div className="mt-20 flex flex-col justify-center admin-container md:float-right">
                <div className="m-auto">
                    <h1 className="text-4xl uppercase">Order</h1>
                </div>
                <div className="admin-table">
                    <DataTable
                        columns={columns}
                        data={final_order_list}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminOrder;
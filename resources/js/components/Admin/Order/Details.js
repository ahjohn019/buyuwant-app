import React, {useEffect, useState} from 'react';
import Sidebar from '../../UI/Admin/Sidebar';
import AuthToken from '../../Helper/AuthToken/AuthToken';
import guitarImg from '../../../../img/guitar-prod.svg';


const OrderDetails = (props) => {
    const [orderList, setOrderList] = useState([])
    let authTokenUsage = AuthToken()
    let authHeaders = {'Authorization': 'Bearer '+ authTokenUsage}

    let order_id_params = props.match.params.order_id
    let convertOrderId = parseInt(order_id_params)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const getOrderDetails = await axios.get(`/api/order_items/`, {headers: authHeaders});
                const getOrderInfo = await axios.get(`/api/orders/`, {headers: authHeaders});

                setOrderList({orderDetailsOne : getOrderDetails.data.orders, orderDetailsTwo: getOrderInfo.data.orders})
            } 
            catch(error){
                console.error(error)
            }
        }
        fetchData()
    },[])

    if(orderList.length <= 0) return null 

    return(
        <div>
            <Sidebar />
            <div className="mt-20 flex flex-col justify-center admin-container space-y-4 md:float-right">
                <div className="m-auto">
                    <h1 className="text-4xl uppercase">Order Details</h1>
                </div>
                {
                    orderList.orderDetailsTwo.filter(index =>index.id === convertOrderId).map((value,index) => 
                        <div key={index} className="p-4 w-1/2 mx-auto">
                            <p>Order ID: #00{value.id}</p>
                            <p>{value.status}</p>
                        </div>
                    )
                }
                { 
                    orderList.orderDetailsOne.filter(index =>index.order_id === convertOrderId).map((value,index) =>
                        <div key={index} className="border rounded-md p-4 w-1/2 mx-auto">
                            <div className="flex space-x-6">
                                <div className="bg-pink-200 p-2">
                                    <div className="flex items-center h-full">
                                        <img src={guitarImg} alt="guitarProd" width="100%" className="object-contain h-20"></img>
                                    </div>
                                </div>
                                <div>
                                    <p>{value.order_items.name}</p>
                                    <p>{value.order_items.sku}</p>
                                </div>
                                <div className="flex space-x-3">
                                    <p>RM {value.order_items.price}</p>
                                    <p>x {value.quantity}</p>
                                    <p>RM {value.total}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    orderList.orderDetailsTwo.filter(index =>index.id === convertOrderId).map((value,index) => 
                        <div key={index} className="p-4 w-1/2 mx-auto">
                            <p>RM {value.amount}</p>
                        </div>
                    )
                }
                <div className="p-4 w-1/2 mx-auto flex justify-end">
                    <button className="my-2 bg-blue-500 hover:bg-blue-700 w-36 h-8 uppercase font-bold text-white rounded-lg text-sm">fullfill</button>
                </div>

            </div>    
        </div>

    );
}

export default OrderDetails;
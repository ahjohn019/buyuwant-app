import React, { useEffect, useState } from "react";
import Sidebar from "../../UI/Admin/Sidebar";
import AuthToken from "../../Helper/AuthToken/AuthToken";
import guitarImg from "../../../../img/guitar-prod.svg";
import PaidOrder from "../../../../img/paid-tick-order.png";
import { useHistory } from "react-router-dom";

const OrderDetails = props => {
    const [orderList, setOrderList] = useState([]);
    const [getUpdatedStatus, setGetUpdatedStatus] = useState("");
    const [displayStatus, setDisplayStatus] = useState(false);

    let authTokenUsage = AuthToken();
    let authHeaders = { Authorization: "Bearer " + authTokenUsage };

    let order_id_params = props.match.params.order_id;
    let convertOrderId = parseInt(order_id_params);

    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getOrderDetails = await axios.get(`/api/order_items/`, {
                    headers: authHeaders
                });
                const getOrderInfo = await axios.get(`/api/orders/`, {
                    headers: authHeaders
                });

                setOrderList({
                    orderDetailsOne: getOrderDetails.data.orders,
                    orderDetailsTwo: getOrderInfo.data.orders
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (orderList.length <= 0) return null;

    const orderDetailsOneFilter = orderList.orderDetailsOne.filter(
        index => index.order_id === convertOrderId
    );
    const orderDetailsTwoFilter = orderList.orderDetailsTwo.filter(
        index => index.id === convertOrderId
    );

    const handleFulFillStatus = async () => {
        try {
            const updateStatus = await axios.put(
                `/api/orders/${convertOrderId}`,
                { status: "success" }
            );
            setGetUpdatedStatus(updateStatus.data.orders.status);
            setDisplayStatus(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteOrder = async () => {
        try {
            await axios.delete(`/api/orders/${convertOrderId}`);
            history.push("/admin/order");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div
                className="mt-20 flex flex-col justify-center admin-container space-y-4 md:float-right"
                style={{ padding: "0 10%" }}
            >
                <div className="m-auto">
                    <h1 className="text-4xl uppercase">Order Details</h1>
                </div>
                {orderDetailsTwoFilter.map((value, index) => (
                    <div key={index}>
                        <p>Order ID: #00{value.id}</p>

                        {displayStatus != true ? (
                            <div
                                className={`${
                                    value.status === "success"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                } w-24 uppercase font-bold text-white rounded-lg text-sm text-center p-2`}
                            >
                                {value.status}
                            </div>
                        ) : (
                            <div className="bg-green-500 w-24 uppercase font-bold text-white rounded-lg text-sm text-center p-2">
                                {getUpdatedStatus}
                            </div>
                        )}
                    </div>
                ))}

                <div className="md:flex">
                    <div className="flex flex-col w-full justify-center items-center mr-6">
                        <div className="w-full space-y-4">
                            <div className="bg-gray-50 border rounded-md p-6 w-full mx-auto space-y-2">
                                {orderDetailsOneFilter.map((value, index) => (
                                    <div
                                        key={index}
                                        className="md:flex md:space-x-6"
                                    >
                                        <div className="bg-pink-200 p-2 w-24 mx-auto">
                                            <div className="flex items-center h-full">
                                                <img
                                                    src={guitarImg}
                                                    alt="guitarProd"
                                                    width="100%"
                                                    className="object-contain h-20"
                                                ></img>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:w-1/2 m-2 text-center md:text-left">
                                            <p>{value.order_items.name}</p>
                                            <p>{value.order_items.sku}</p>
                                            <p>{value.variant_details}</p>
                                        </div>
                                        <div className="flex justify-center md:justify-end md:w-1/2 space-x-4 ">
                                            <p>RM {value.order_items.price}</p>
                                            <p>x {value.quantity}</p>
                                            <p>RM {value.total}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 border rounded w-full p-5 m-2">
                            {orderDetailsTwoFilter.map((value, index) => (
                                <div key={index}>
                                    <div>
                                        <div className="flex">
                                            <div className="flex">
                                                <img
                                                    src={PaidOrder}
                                                    alt="PaidOrder"
                                                    width="50px"
                                                    className="object-contain h-16"
                                                ></img>
                                            </div>
                                            <div className="flex">
                                                <p className="text-xl font-bold m-auto ml-0">
                                                    Paid
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <p>Subtotal</p>
                                                <p>RM {value.total}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>Tax</p>
                                                <p>6%</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>Total </p>
                                                <p> RM {value.total_tax}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleFulFillStatus}
                                    className="my-2 bg-blue-500 hover:bg-blue-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm"
                                >
                                    fullfill
                                </button>
                                <button
                                    onClick={handleDeleteOrder}
                                    className="my-2 bg-red-500 hover:bg-red-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm ml-2"
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 border rounded-md flex flex-col justify-center md:w-1/3 h-1/2">
                        {orderDetailsTwoFilter.map((value, index) => (
                            <div
                                key={index}
                                className=" p-4 w-full mx-auto space-y-4"
                            >
                                <div className="border-b">
                                    <p className="text-lg font-bold">
                                        Customer
                                    </p>
                                    <div className="my-2">
                                        <p>{value.order_user.name}</p>
                                        <p>{value.order_user.phone_number}</p>
                                    </div>
                                </div>
                                <div className="border-b">
                                    <p className="text-lg font-bold">
                                        Contact Information
                                    </p>
                                    <div className="my-2">
                                        <p>{value.order_user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">
                                        Shipping Address
                                    </p>
                                    {value.order_user.user_addresses.map(
                                        (value, index) => (
                                            <div key={index} className="my-2">
                                                <p>{value.address_line}</p>
                                                <p>{value.postcode}</p>
                                                <p>{value.state}</p>
                                                <p>{value.country}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

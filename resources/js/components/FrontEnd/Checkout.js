import React, { useState, useEffect } from "react";
import NavBar from "../UI/NavBar/NavBar.js";
import { Link } from "react-router-dom";
import AuthToken from "../Helper/AuthToken/AuthToken";
import dummyImg from "../../../img/dummy_img.png";
import axios from "axios";

function Checkout() {
    const [sessionCartData, setSessionCartData] = useState([]);
    const [updatedQty, setUpdatedQty] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [subtotalTax, setSubtotalTax] = useState("");
    const [afterUpdate, setAfterUpdate] = useState("");
    const [updatedAllQty, setUpdatedAllQty] = useState("");
    const [couponValue, setCouponValue] = useState("");
    const [couponResult, setCouponResult] = useState("");
    let authTokenUsage = AuthToken();
    let authHeaders = { Authorization: "Bearer " + authTokenUsage };

    const refreshQty = event => {
        setUpdatedQty(event.target.value);
        setUpdatedAllQty({
            ...updatedAllQty,
            [event.target.id]: event.target.value
        });
    };

    const cartViewSession = async () => {
        try {
            if (authTokenUsage.length <= 0) {
                return null;
            }

            await axios({
                method: "GET",
                url: "/api/cart/viewSession",
                headers: authHeaders
            }).then(response => {
                setSessionCartData(response.data.data);
                setSubtotal(response.data.subtotal);
                setSubtotalTax(response.data.subtotalWithTax);
            });
        } catch (error) {
            console.error(error);
        }

        return sessionCartData;
    };

    useEffect(() => {
        cartViewSession();
    }, []);

    const updateSessions = async (itemsId, qty) => {
        try {
            await axios({
                method: "POST",
                url: "/api/cart/updateSession",
                headers: authHeaders,
                params: {
                    items_id: itemsId,
                    quantity: qty
                }
            }).then(response => {
                cartViewSession();
                setAfterUpdate(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async event => {
        try {
            const deleteId = event.currentTarget.name;

            await axios({
                method: "POST",
                url: "/api/cart/delItemsSession",
                headers: authHeaders,
                params: {
                    items_id: deleteId
                }
            }).then(response => {
                cartViewSession();
                setAfterUpdate(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearAll = async () => {
        try {
            await axios({
                method: "POST",
                url: "/api/cart/delSession",
                headers: authHeaders
            }).then(() => {
                cartViewSession();
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateAll = async () => {
        try {
            for (var a in updatedAllQty) {
                await updateSessions(a, updatedAllQty[a]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateSingle = async event => {
        var cartId = event.currentTarget.name;
        var aftersplit = cartId.split("-");
        var getlastCartId = aftersplit.slice(-1);
        try {
            await updateSessions(parseInt(getlastCartId[0]), updatedQty);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCoupon = async event => {
        setCouponValue(event.target.value);
    };

    const handleCouponProcess = async () => {
        try {
            await axios({
                method: "POST",
                url: "/api/cart/activateCoupon",
                headers: authHeaders,
                params: {
                    coupon_code: couponValue
                }
            }).then(response => {
                setCouponResult(response.data);
            });
        } catch (error) {
            setCouponResult(error.response.status);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="flex justify-center my-12">
                <div className="flex-1 p-6 md:flex md:container md:mx-auto">
                    <div className="p-8 bg-gray-100 rounded-3xl lg:w-1/2 mx-auto">
                        <table
                            className="w-full text-sm lg:text-base"
                            cellSpacing="0"
                        >
                            <thead>
                                <tr className="h-12 uppercase">
                                    <th className="hidden md:table-cell"></th>
                                    <th className="text-left">Product</th>
                                    <th className="lg:text-right text-left lg:pl-0">
                                        <span
                                            className="lg:hidden"
                                            title="Quantity"
                                        >
                                            Qty
                                        </span>
                                        <span className="hidden lg:inline">
                                            Quantity
                                        </span>
                                    </th>
                                    <th className="hidden text-right md:table-cell">
                                        Unit price
                                    </th>
                                    <th className="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(sessionCartData).map(
                                    (value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="hidden pb-4 md:table-cell">
                                                    <a href="#">
                                                        <img
                                                            src={
                                                                value.attributes
                                                                    .img ==
                                                                "none"
                                                                    ? dummyImg
                                                                    : value
                                                                          .attributes
                                                                          .img
                                                            }
                                                            className="w-20 rounded"
                                                            alt="Thumbnail"
                                                        />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#">
                                                        <div className="w-1/2 truncate md:w-full">
                                                            <span className="mb-2">
                                                                {value.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <div className="flex flex-col">
                                                                <div>
                                                                    <span className="bg-green-500 text-white font-bold py-1 px-3 rounded text-sm">
                                                                        x
                                                                        {
                                                                            value.quantity
                                                                        }
                                                                    </span>
                                                                </div>
                                                                {value
                                                                    .attributes
                                                                    .variant ===
                                                                null ? null : (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        name={
                                                                            value.id
                                                                        }
                                                                        className="mt-2 space-x-2"
                                                                    >
                                                                        {Array.from(
                                                                            value
                                                                                .attributes
                                                                                .variant,
                                                                            (
                                                                                value,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <span
                                                                                        className="bg-blue-500 text-white font-bold py-1 px-3 rounded text-sm"
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            value
                                                                                        }
                                                                                    </span>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="ml-2">
                                                                <button
                                                                    onClick={
                                                                        handleDelete
                                                                    }
                                                                    name={
                                                                        value.id
                                                                    }
                                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="justify-center md:justify-end md:flex mt-6">
                                                    <div className="flex justify-between w-20 h-10">
                                                        <div className="flex">
                                                            <input
                                                                defaultValue={
                                                                    value.quantity
                                                                }
                                                                placeholder="Qty"
                                                                id={value.id}
                                                                onChange={
                                                                    refreshQty
                                                                }
                                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded pl-4 leading-tight focus:outline-none focus:bg-white"
                                                                name="sessionQty"
                                                                type="number"
                                                                min="1"
                                                            />
                                                            <button
                                                                name={`cart-item-${value.id}`}
                                                                onClick={
                                                                    handleUpdateSingle
                                                                }
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden text-right md:table-cell">
                                                    {value.attributes
                                                        .original_price !=
                                                    value.price ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-sm lg:text-base font-medium line-through text-color-800">
                                                                RM
                                                                {
                                                                    value
                                                                        .attributes
                                                                        .original_price
                                                                }
                                                            </span>
                                                            <span className="text-sm lg:text-base font-medium">
                                                                RM {value.price}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm lg:text-base font-medium">
                                                            RM {value.price}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="text-right">
                                                    <span className="text-sm lg:text-base font-medium">
                                                        RM{" "}
                                                        {value.id ==
                                                        afterUpdate["newItemId"]
                                                            ? afterUpdate[
                                                                  "newPrice"
                                                              ]
                                                            : value.attributes
                                                                  .total}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        {sessionCartData == "" ? null : (
                            <div className="mt-10 flex justify-end">
                                <button
                                    onClick={handleUpdateAll}
                                    className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Update All
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </div>

                    <hr className="pb-6 mt-6" />
                    <div className="my-4 mt-6 lg:flex-col mx-auto">
                        <div className="lg:px-2 lg:w-full">
                            <div className="p-4 bg-gray-100 rounded-full">
                                <h1 className="ml-2 font-bold uppercase">
                                    Order Details
                                </h1>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Subtotal
                                    </div>

                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        RM {subtotal}
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4 border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Tax (GST)
                                    </div>
                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        6%
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4 border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Shipping
                                    </div>
                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        FREE
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Total
                                    </div>

                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        RM {subtotalTax}
                                    </div>
                                </div>
                                <Link to="/payment">
                                    <button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                        <svg
                                            aria-hidden="true"
                                            data-prefix="far"
                                            data-icon="credit-card"
                                            className="w-8"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                                            />
                                        </svg>
                                        <span className="ml-2 mt-5px">
                                            Procceed to checkout
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:px-2 lg:w-full">
                            <div className="p-4">
                                <div className="justify-center md:flex">
                                    {/* <form onSubmit={handleCouponProcess}> */}
                                    <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                                        <input
                                            type="text"
                                            name="code"
                                            value={couponValue}
                                            onChange={handleCoupon}
                                            placeholder="Apply coupon"
                                            className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
                                        />
                                        <input
                                            onClick={handleCouponProcess}
                                            type="submit"
                                            value="Submit"
                                            className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                                        />
                                    </div>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;

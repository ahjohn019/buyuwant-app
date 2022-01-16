import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function EditAddress(prop) {
    const [updateAddr, setUpdateAddr] = useState({
        address_line: prop.userProfileAddrLine,
        state: prop.userProfileState,
        country: prop.userProfileCountry,
        phone_number: prop.userProfilePhoneNo,
        postcode: prop.userProfilePostcode,
        user_id: prop.userProfileId
    });

    const onEditAddress = prop => event => {
        event.preventDefault();
        setUpdateAddr({ ...updateAddr, [prop]: event.target.value });
    };

    const handleEditProfile = async event => {
        let authList = document.cookie
            .split("; ")
            .find(row => row.startsWith("authToken="));
        try {
            if (document.cookie.indexOf(authList) == -1) {
                console.log("Need authorized only can add to cart");
            } else {
                let authToken = authList.split("=")[1];
                const addrId = event.target.value;
                await axios({
                    method: "POST",
                    url: `/api/auth/update-address/${addrId}`,
                    headers: {
                        Authorization: "Bearer " + authToken
                    },
                    params: {
                        address_line: updateAddr.address_line,
                        state: updateAddr.state,
                        country: updateAddr.country,
                        phone_number: updateAddr.phone_number,
                        postcode: updateAddr.postcode,
                        user_id: updateAddr.user_id
                    }
                }).then(() => {
                    window.location.reload(false);
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Add Address Modal
    const addressStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 550,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4
    };

    //Open Address Modal
    const [openAddress, setOpenAddress] = useState(false);
    const handleOpenAddress = () => setOpenAddress(true);
    const handleCloseAddress = () => setOpenAddress(false);

    return (
        <div>
            <button
                value={prop.userProfileAddrId}
                onClick={handleOpenAddress}
                className="bg-red-200 hover:bg-red-500 w-20 h-10 rounded-lg float-right uppercase"
            >
                Edit
            </button>
            <Modal
                open={openAddress}
                onClose={handleCloseAddress}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={addressStyle}>
                    <form
                        className="w-full max-w-lg"
                        onSubmit={handleEditProfile}
                    >
                        <div className="flex flex-wrap -mx-6 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="address-line"
                                >
                                    Address Line
                                </label>
                                <input
                                    onChange={onEditAddress("address_line")}
                                    defaultValue={prop.userProfileAddrLine}
                                    className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="address-line"
                                    type="text"
                                    placeholder="Address Line"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="address-postcode"
                                >
                                    Postcode
                                </label>
                                <input
                                    onChange={onEditAddress("postcode")}
                                    defaultValue={prop.userProfilePostcode}
                                    className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="address-postcode"
                                    type="text"
                                    placeholder="Postcode"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="address-state"
                                >
                                    State
                                </label>
                                <div className="relative">
                                    <select
                                        onChange={onEditAddress("state")}
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="address-state"
                                    >
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Johor"
                                        >
                                            Johor
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Kedah"
                                        >
                                            Kedah
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Kelantan"
                                        >
                                            Kelantan
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Kuala Lumpur"
                                        >
                                            Kuala Lumpur
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Labuan"
                                        >
                                            Labuan
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Melaka"
                                        >
                                            Melaka
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Negeri Sembilan"
                                        >
                                            Negeri Sembilan
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Pahang"
                                        >
                                            Pahang
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Penang"
                                        >
                                            Penang
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Perak"
                                        >
                                            Perak
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Perlis"
                                        >
                                            Perlis
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Putrajaya"
                                        >
                                            Putrajaya
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Sabah"
                                        >
                                            Sabah
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Sarawak"
                                        >
                                            Sarawak
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Selangor"
                                        >
                                            Selangor
                                        </option>
                                        <option
                                            onChange={onEditAddress("state")}
                                            value="Terengganu"
                                        >
                                            Terengganu
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-state"
                                >
                                    Country
                                </label>
                                <div className="relative">
                                    <select
                                        onChange={onEditAddress("country")}
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="address-state"
                                    >
                                        <option
                                            onChange={onEditAddress("country")}
                                            defaultValue={
                                                prop.userProfileCountry
                                            }
                                        >
                                            Malaysia
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="address-phonenum"
                                >
                                    Phone Number
                                </label>
                                <input
                                    onChange={onEditAddress("phone_number")}
                                    defaultValue={prop.userProfilePhoneNo}
                                    className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="address-phonenum"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0 flex justify-center">
                                <button
                                    onClick={handleEditProfile}
                                    value={prop.userProfileAddrId}
                                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import Sidebar from "../../UI/Admin/Sidebar";
import AuthToken from "../../Helper/AuthToken/AuthToken";
import { useHistory } from "react-router-dom";

const ProductAdd = () => {
    const [insertItems, setInsertItems] = useState({
        name: "",
        desc: "",
        price: "",
        sku: "",
        img: "",
        status: "active",
        category_id: "1"
    });

    const [categoryData, setCategoryData] = useState([]);
    const [imgObject, setImgObject] = useState([]);
    const [insertItemsErrorMsg, setInsertItemsErrorMsg] = useState([]);

    const onInsertItems = prop => event => {
        event.preventDefault();
        setInsertItems({ ...insertItems, [prop]: event.target.value });
    };

    const onImageChange = event => {
        let imgPathUrl = event.target.files[0];
        setImgObject({
            img_path: URL.createObjectURL(imgPathUrl),
            img_object: imgPathUrl
        });
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryGet = await axios.get(`/api/category`);
                setCategoryData(categoryGet.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategory();
    }, []);

    let authTokenUsage = AuthToken();
    let authHeaders = { Authorization: "Bearer " + authTokenUsage };
    let history = useHistory();

    const onSubmitItems = async () => {
        try {
            const formData = new FormData();
            const cloud_name_id = process.env.MIX_CLOUDINARY_NAME;
            const cloud_upload_preset =
                process.env.MIX_CLOUDINARY_UPLOAD_PRESET;

            formData.append("file", imgObject.img_object);
            formData.append("upload_preset", cloud_upload_preset);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name_id}/image/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const file = await res.json();

            if (imgObject.length <= 0) {
                insertItems["img"] = "none";
            } else {
                insertItems["img"] = file.secure_url;
            }

            await axios
                .post(`/api/items`, insertItems, {
                    headers: authHeaders
                })
                .then(res => {
                    console.log(res);
                });

            history.push("/admin/product");
        } catch (error) {
            setInsertItemsErrorMsg({
                title_error: error.response.data.name,
                desc_error: error.response.data.desc,
                price_error: error.response.data.price,
                sku_error: error.response.data.sku
            });
        }
    };

    return (
        <div>
            <Sidebar />
            <div
                className="flex flex-col justify-center admin-container space-y-4 md:float-right min-h-screen mt-8"
                style={{ padding: "0 10%" }}
            >
                <div className="text-center mb-6">
                    <p className="text-4xl uppercase">add products</p>
                </div>

                <div className="border rounded-md p-4 md:w-3/4 md:m-auto md:mt-0">
                    <div>
                        <label
                            htmlFor="item-title"
                            className="text-sm uppercase"
                        >
                            title
                        </label>
                        <input
                            type="text"
                            id="small-input"
                            className="block p-2 w-full text-gray-900 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="White T-Shirt"
                            onChange={onInsertItems("name")}
                        />
                        <p className="text-red-500 text-sm">
                            {insertItemsErrorMsg.title_error}
                        </p>
                    </div>
                    <div className="mt-2">
                        <label
                            htmlFor="item-description"
                            className="text-sm uppercase"
                        >
                            description
                        </label>
                        <textarea
                            id="item-description"
                            rows="4"
                            className="block p-2 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                            placeholder="Add Description"
                            onChange={onInsertItems("desc")}
                        ></textarea>
                        <p className="text-red-500 text-sm">
                            {insertItemsErrorMsg.desc_error}
                        </p>
                    </div>
                    <div>
                        <h1>Select Image</h1>
                        {imgObject.length <= 0 ? null : (
                            <img
                                src={imgObject.img_path}
                                width="100%"
                                className="object-contain h-48"
                            />
                        )}

                        <input
                            type="file"
                            name="myImage"
                            onChange={onImageChange}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="mt-2 w-1/2">
                            <label
                                htmlFor="item-price"
                                className="text-sm uppercase"
                            >
                                price
                            </label>
                            <input
                                type="text"
                                id="item-price"
                                className="block p-2 w-full text-gray-900 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0.00"
                                onChange={onInsertItems("price")}
                            />
                            <p className="text-red-500 text-sm">
                                {insertItemsErrorMsg.price_error}
                            </p>
                        </div>

                        <div className="mt-2 w-1/2">
                            <label
                                htmlFor="item-sku"
                                className="text-sm uppercase"
                            >
                                sku
                            </label>
                            <input
                                type="text"
                                id="item-sku"
                                className="block p-2 w-full text-gray-900 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="SHIRT-001"
                                onChange={onInsertItems("sku")}
                            />
                            <p className="text-red-500 text-sm">
                                {insertItemsErrorMsg.sku_error}
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="mt-2 w-1/2">
                            <label
                                htmlFor="item-status"
                                className="text-sm uppercase"
                            >
                                status
                            </label>
                            <select
                                id="item-status"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={onInsertItems("status")}
                            >
                                <option
                                    value="active"
                                    onChange={onInsertItems("status")}
                                >
                                    Active
                                </option>
                                <option
                                    value="draft"
                                    onChange={onInsertItems("status")}
                                >
                                    Draft
                                </option>
                            </select>
                        </div>
                        <div className="mt-2 w-1/2">
                            <label
                                htmlFor="item-category"
                                className="text-sm uppercase"
                            >
                                category
                            </label>
                            <select
                                id="item-category"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={onInsertItems("category_id")}
                            >
                                {categoryData.map((category, index) => (
                                    <option
                                        value={category.id}
                                        key={index}
                                        onChange={onInsertItems("category_id")}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="mt-4 uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onSubmitItems}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;

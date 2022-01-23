import React, { useEffect, useState } from "react";
import Sidebar from "../../UI/Admin/Sidebar";
import AuthToken from "../../Helper/AuthToken/AuthToken";
import { useHistory } from "react-router-dom";

const ProductDetails = props => {
    //1. bring specific api id for Products
    //2. input must have existing item details default value
    //3. use event target value for checking the data
    //4. submit and update the items data to databases
    //5. notify the success message after updated the item
    const [updateItems, setUpdateItems] = useState({
        name: "",
        desc: "",
        price: "",
        sku: "",
        img: "",
        status: "active",
        category_id: "1"
    });

    const [specificItems, setSpecificItems] = useState([]);
    const [imgObject, setImgObject] = useState([]);
    const [checkUpdateImg, setCheckUpdateImg] = useState(false);

    let items_id_params = props.match.params.product_id;

    const onUpdateItems = prop => event => {
        event.preventDefault();
        setUpdateItems({ ...updateItems, [prop]: event.target.value });
    };

    const onImageUpdate = event => {
        let imgPathUrl = event.target.files[0];
        setImgObject({
            img_path: URL.createObjectURL(imgPathUrl),
            img_object: imgPathUrl
        });
        setCheckUpdateImg(true);
    };

    useEffect(() => {
        const fetchSpecificItems = async () => {
            try {
                const getSpecificItems = await axios.get(
                    `/api/items/${items_id_params}`
                );
                const categoryGetData = await axios.get(`/api/category`);

                setSpecificItems({
                    specificItemData: getSpecificItems.data,
                    categoryData: categoryGetData.data.data
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchSpecificItems();
    }, []);

    let authTokenUsage = AuthToken();
    let authHeaders = { Authorization: "Bearer " + authTokenUsage };

    const onUpdatedItems = async () => {
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

            await axios.post(
                `/api/items/${items_id_params}`,
                { img: file.secure_url },
                { headers: authHeaders }
            );
        } catch (error) {
            console.error(error);
        }
    };

    if (specificItems.length <= 0) return null;
    if (imgObject.length <= 0) {
        updateItems["img"] = "none";
    }

    return (
        <div>
            <Sidebar />
            <div
                className="flex flex-col justify-center admin-container space-y-4 md:float-right min-h-screen mt-8"
                style={{ padding: "0 10%" }}
            >
                <div className="text-center mb-6">
                    <p className="text-4xl uppercase">edit product</p>
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
                            defaultValue={specificItems.specificItemData.name}
                            onChange={onUpdateItems("name")}
                        />
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
                            defaultValue={specificItems.specificItemData.desc}
                            onChange={onUpdateItems("desc")}
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="item-image"
                            className="text-sm uppercase"
                        >
                            image
                        </label>
                        <div className="p-4">
                            {specificItems.specificItemData.img ==
                            "none" ? null : (
                                <img
                                    src={
                                        checkUpdateImg === false
                                            ? specificItems.specificItemData.img
                                            : imgObject.img_path
                                    }
                                    width="100%"
                                    className="object-contain h-48"
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            name="myImage"
                            onChange={onImageUpdate}
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
                                defaultValue={
                                    specificItems.specificItemData.price
                                }
                                onChange={onUpdateItems("price")}
                            />
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
                                defaultValue={
                                    specificItems.specificItemData.sku
                                }
                                onChange={onUpdateItems("sku")}
                            />
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
                                onChange={onUpdateItems("status")}
                            >
                                <option
                                    value="active"
                                    onChange={onUpdateItems("status")}
                                >
                                    Active
                                </option>
                                <option
                                    value="draft"
                                    onChange={onUpdateItems("status")}
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
                                onChange={onUpdateItems("category_id")}
                            >
                                {specificItems.categoryData.map(
                                    (category, index) => (
                                        <option
                                            value={category.id}
                                            key={index}
                                            onChange={onUpdateItems(
                                                "category_id"
                                            )}
                                        >
                                            {category.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="mt-4 uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onUpdatedItems}
                        >
                            update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

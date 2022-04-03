import React, { useState, useEffect } from "react";
import NavBar from "../UI/NavBar/NavBar.js";
import dummyImg from "../../../img/dummy_img.png";
import { useHistory } from "react-router-dom";
import AuthToken from "../Helper/AuthToken/AuthToken";
import AddCartSession from "../Helper/AddCartSession/AddCartSession";
import FilterVariantHelper from "../Helper/Variant/FilterItemDesc";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";

function ItemDesc(props) {
    const [itemDescData, setItemDescData] = useState([]);
    const [itemsQty, setItemsQty] = useState(1);
    let history = useHistory();
    let items_id_params = props.match.params.items_id;
    let authTokenUsage = AuthToken();

    const [colorVariant, setColorVariant] = useState([]);
    const [customVariant, setCustomVariant] = useState([]);
    const variantSelection = [];

    useEffect(() => {
        const itemDesc = async () => {
            try {
                const itemResponse = await axios.get(
                    `/api/items/${items_id_params}`
                );
                const variantDetailsResponse = await axios.get(
                    `/api/variant_details`
                );
                const variantResponse = await axios.get(`/api/variants`);
                setItemDescData({
                    singleItem: itemResponse.data,
                    variantMain: variantResponse.data.variants,
                    variantDetails: variantDetailsResponse.data.variant_details
                });
            } catch (error) {
                console.error(error);
            }
        };
        itemDesc();
    }, []);

    if (itemDescData.length <= 0) return null;

    const IncrementQty = () => {
        setItemsQty(itemsQty + 1);
    };
    const DecreaseQty = () => {
        setItemsQty(itemsQty - 1);
    };

    const variantGroupInterface = FilterVariantHelper(
        itemDescData.variantDetails,
        items_id_params
    );

    const handleUIChange = event => {
        const { name, value } = event.target;
        event.persist();
        if (name == "Color") {
            setColorVariant(value);
        } else {
            setCustomVariant(value);
        }
    };

    variantSelection.push(colorVariant, customVariant);
    const filterSelection = variantSelection.filter(index => index.length > 0);

    return (
        <div>
            <NavBar />
            <div className="container mx-auto px-6 md:w-1/2">
                <div className="uppercase m-2 md:m-8 flex flex-col md:flex-row">
                    <div className="w-full p-2">
                        <div className="flex items-center h-full">
                            <img
                                src={
                                    itemDescData.singleItem.img == "none"
                                        ? dummyImg
                                        : itemDescData.singleItem.img
                                }
                                alt={
                                    itemDescData.singleItem.img == "none"
                                        ? dummyImg
                                        : itemDescData.singleItem.img
                                }
                                width="100%"
                                className="object-contain h-48"
                            ></img>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 md:mt-0 md:ml-6 w-full border rounded-lg p-6 space-y-4 flex flex-col justify-center text-center md:text-left">
                        <p className="text-xl font-bold">
                            {itemDescData.singleItem.name}
                        </p>
                        <p className="text-sm">
                            {itemDescData.singleItem.desc}
                        </p>

                        <p className="text-2xl font-bold">
                            RM {itemDescData.singleItem.price}
                        </p>

                        <div className="flex">
                            <div className="m-auto ml-0">
                                <p className="text-sm">quantity</p>
                            </div>
                            <div className="space-x-6 flex">
                                <div className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-200">
                                    <button onClick={DecreaseQty}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 12H4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <p className="text-2xl">{itemsQty}</p>
                                </div>
                                <div className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-200">
                                    <button onClick={IncrementQty}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {variantGroupInterface.map((form, index) => (
                            <div
                                key={form[index].props.name}
                                className="flex justify-between items-center"
                            >
                                <p>{form[index].props.name}</p>
                                <div>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            aria-label={form[index].props.name}
                                            name="controlled-radio-buttons-group"
                                            onChange={handleUIChange}
                                        >
                                            {variantGroupInterface[index]}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col items-center md:flex-row md:space-x-4 ">
                            <div className="flex space-x-4 mt-2 md:mt-0">
                                <button
                                    name={itemsQty}
                                    onClick={e =>
                                        AddCartSession(
                                            items_id_params,
                                            authTokenUsage,
                                            history,
                                            e.currentTarget.name,
                                            filterSelection
                                        )
                                    }
                                    className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-32 h-10 uppercase font-bold text-white rounded-lg text-sm "
                                    type="submit"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="LearnMoreBtn bg-gray-200 hover:bg-red-700 w-12 h-10 rounded-lg "
                                    type="submit"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mx-auto h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 border p-8">
                    <p className="uppercase text-2xl font-semibold ">
                        items description
                    </p>
                    <hr />
                    <p>{itemDescData.singleItem.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemDesc;

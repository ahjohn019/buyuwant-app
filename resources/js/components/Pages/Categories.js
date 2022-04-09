import React, { useState, useEffect } from "react";
import NavBar from "../UI/NavBar/NavBar.js";
import livingProd from "../../../img/sofa.png";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthToken from "../Helper/AuthToken/AuthToken";
import { useHistory } from "react-router-dom";
import SortResults from "../Helper/SortResults/SortResults";
import AddCartSession from "../Helper/AddCartSession/AddCartSession";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function CategoryIndex(props) {
    const [categoriesDetails, setCategoriesDetails] = useState([]);
    const [gridCustom, setGridCustom] = useState(false);
    const [categoryCustom, setCategoryCustom] = useState({
        categoryDetailsCustom: "name_asc"
    });
    const [paginateItemData, setPaginateItemData] = useState([]);
    const [checkPaginateExist, setCheckPaginateExist] = useState(false);

    let history = useHistory();
    const handleCategoryCustom = prop => event => {
        event.preventDefault();
        setCategoryCustom({ ...categoryCustom, [prop]: event.target.value });
    };

    let customCategories = categoryCustom["categoryDetailsCustom"];
    let id = props.match.params.categories_id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryItemDetails = await axios.get(
                    `/api/items/category/${id}/paginate`,
                    { params: { page: 1 } }
                );
                const categoryTitle = await axios.get(`/api/category/${id}`);

                setCategoriesDetails({
                    details_one: categoryItemDetails.data.categoryPaginate.data,
                    details_two: categoryTitle.data.name,
                    lastpage_count:
                        categoryItemDetails.data.categoryPaginate.last_page
                });
                setCheckPaginateExist(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (categoriesDetails.length <= 0) return null;

    const handlePagination = async (event, value) => {
        try {
            await axios
                .get(`/api/items/category/${id}/paginate`, {
                    params: { page: value }
                })
                .then(response =>
                    setPaginateItemData(response.data.categoryPaginate.data)
                );
            setCheckPaginateExist(true);
        } catch (error) {
            console.error(error);
        }
    };

    let sort_results =
        checkPaginateExist === false
            ? SortResults(categoriesDetails.details_one, customCategories)
            : SortResults(paginateItemData, customCategories);

    console.log(sort_results);

    return (
        <div>
            <NavBar />
            <div className="container mx-auto p-8">
                <div className="font-bold uppercase mt-6 md:flex  justify-between">
                    <div className="text-2xl font-bold text-indigo-700 flex items-center justify-center">
                        {categoriesDetails.details_two}
                    </div>
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center">
                            <div>
                                <label>Sort By :</label>
                                <select
                                    className="focus:outline-none cursor-pointer"
                                    onChange={handleCategoryCustom(
                                        "categoryDetailsCustom"
                                    )}
                                >
                                    <option
                                        value="name_asc"
                                        onChange={handleCategoryCustom(
                                            "categoryDetailsCustom"
                                        )}
                                    >
                                        {" "}
                                        A-Z
                                    </option>
                                    <option
                                        value="name_desc"
                                        onChange={handleCategoryCustom(
                                            "categoryDetailsCustom"
                                        )}
                                    >
                                        Z-A
                                    </option>
                                    <option
                                        value="price_asc"
                                        onChange={handleCategoryCustom(
                                            "categoryDetailsCustom"
                                        )}
                                    >
                                        Price ASC
                                    </option>
                                    <option
                                        value="price_desc"
                                        onChange={handleCategoryCustom(
                                            "categoryDetailsCustom"
                                        )}
                                    >
                                        Price DESC
                                    </option>
                                    <option
                                        value="newest_date"
                                        onChange={handleCategoryCustom(
                                            "categoryDetailsCustom"
                                        )}
                                    >
                                        Newest Date
                                    </option>
                                    <option
                                        value="oldest_date"
                                        onChange={handleCategoryCustom(
                                            "categoryDetailsCustom"
                                        )}
                                    >
                                        Oldest Date
                                    </option>
                                </select>
                            </div>
                            <button
                                onClick={() => setGridCustom(false)}
                                className="px-2 py-2 rounded-full hover:bg-gray-200"
                            >
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
                                        strokeWidth="2"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => setGridCustom(true)}
                                className="px-2 py-2 rounded-full hover:bg-gray-200 "
                            >
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
                                        strokeWidth="2"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`grid ${
                        gridCustom ? "grid-cols-1" : "grid-cols-2"
                    } md:${
                        gridCustom ? "grid-cols-1" : "grid-cols-4"
                    } gap-8 mt-12 text-center`}
                >
                    {sort_results.map(response => (
                        <div
                            key={response.id}
                            className={`${gridCustom &&
                                "flex w-full md:w-1/2 md:mx-auto"}`}
                        >
                            <div
                                className={`${gridCustom &&
                                    "w-1/2 mx-auto"} border rounded-lg p-4 shadow h-48 flex justify-center items-center relative`}
                            >
                                <Link
                                    to={{
                                        pathname: `/items_details/${response.id}`
                                    }}
                                >
                                    <img
                                        src={
                                            response.img == "none"
                                                ? livingProd
                                                : response.img
                                        }
                                        alt={
                                            response.img == "none"
                                                ? livingProd
                                                : response.img
                                        }
                                        width="100%"
                                        className={`object-contain w-48`}
                                    ></img>
                                </Link>

                                <button
                                    onClick={e =>
                                        AddCartSession(
                                            e.currentTarget.value,
                                            AuthToken(),
                                            history,
                                            1
                                        )
                                    }
                                    value={response.id}
                                    name="categories-cart"
                                    className="bg-green-400 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm shadow-lg absolute bottom-2 right-2"
                                    type="submit"
                                >
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
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div
                                className={`mt-2 space-y-2 ${gridCustom &&
                                    "w-full flex flex-col items-center justify-center"}`}
                            >
                                <p className="text-sm md:text-2xl font-bold text-indigo-700">
                                    {response.name}
                                </p>
                                <p
                                    className={`${
                                        gridCustom ? "block" : "hidden"
                                    }`}
                                >
                                    {response.desc}
                                </p>
                                {response.discount_price !== null ? (
                                    <div className="flex justify-center space-x-4">
                                        <span className="font-bold md:text-2xl text-red-500 line-through">
                                            RM {response.price}
                                        </span>
                                        <span className="font-bold md:text-2xl ">
                                            RM {response.discount_price}
                                        </span>
                                    </div>
                                ) : (
                                    <p className="font-bold md:text-2xl">
                                        RM {response.price}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <Stack spacing={2}>
                    <Pagination
                        count={categoriesDetails.lastpage_count}
                        onChange={handlePagination}
                        color="primary"
                        size="large"
                    />
                </Stack>
            </div>
        </div>
    );
}

export default CategoryIndex;

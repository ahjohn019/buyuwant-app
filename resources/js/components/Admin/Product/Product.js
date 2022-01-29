import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../../UI/Admin/Sidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import AuthToken from "../../Helper/AuthToken/AuthToken";

function AdminProduct() {
    const [productList, setProductList] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const itemsGet = await axios.get(`/api/items`);
            setProductList(itemsGet.data.items);
        };
        fetchData();
    }, []);

    const handleItemDelete = async event => {
        try {
            let authTokenUsage = AuthToken();
            let authHeaders = { Authorization: "Bearer " + authTokenUsage };

            await axios
                .delete(`/api/items/${event.target.value}`, {
                    headers: authHeaders
                })
                .then(window.location.reload(false));
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Price", selector: row => row.price, sortable: true },
        { name: "Status", selector: row => row.status, sortable: true },
        {
            name: "Action",
            button: true,
            cell: row => (
                <div className="flex flex-col">
                    <Link
                        to={{
                            pathname: `/admin/product-details/${row.items_id}`
                        }}
                    >
                        <button className="my-2 bg-blue-500 hover:bg-blue-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm ">
                            Edit
                        </button>
                    </Link>
                    <button
                        value={row.items_id}
                        onClick={handleItemDelete}
                        className="my-1 bg-red-500 hover:bg-red-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm "
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    const productListRow = productList.map(function(productList, index) {
        return {
            id: index + 1,
            items_id: productList.id,
            name: productList.name,
            price: productList.price,
            status: productList.status,
            sku: productList.sku
        };
    });

    const filteredItems = productListRow.filter(
        item =>
            item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <div className="w-full m-auto py-4 flex justify-around items-center">
                <div>
                    <input
                        onChange={e => setFilterText(e.target.value)}
                        value={filterText}
                        placeholder="Search"
                        className="border-2 border-gray-200 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="text"
                    />
                </div>
                <div>
                    <button
                        className="bg-red-500 hover:bg-red-700 p-2 border rounded text-white"
                        onClick={handleClear}
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="ml-auto">
                    <Link
                        to={{
                            pathname: `/admin/product-details/add`
                        }}
                    >
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add Now
                        </button>
                    </Link>
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <div>
            <Sidebar />

            <div className="mt-20 flex flex-col justify-center admin-container md:float-right">
                <h1 className="text-4xl uppercase text-center">Product</h1>

                <div className="admin-table">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminProduct;

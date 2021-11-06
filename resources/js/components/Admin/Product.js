import React, { useState, useEffect, useMemo}  from 'react';
import Sidebar from '../UI/Admin/Sidebar';
import DataTable from 'react-data-table-component';

function AdminProduct (){

    const [productList, setProductList] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        axios({
            method: 'GET',
            url:'/api/items'
        }).then(response =>{
            setProductList(response.data.items)
        })
    },[])

    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true},
        { name: 'Price', selector: row => row.price, sortable: true},
        { name: 'Status', selector: row => row.status, sortable: true},
        {name:'Action',button:true,cell:row=>(
            <div className="flex flex-col">
                <button className="my-2 bg-blue-500 hover:bg-blue-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm ">Edit</button>
                <button className="my-1 bg-red-500 hover:bg-red-700 w-24 h-8 uppercase font-bold text-white rounded-lg text-sm ">Delete</button>
            </div>
        )}
    ];
   
    const productListRow = productList.map(function(productList, index) {
        return{id:index+1,name:productList.name, price:productList.price,  
            status:productList.status}
    })

    const filteredItems = productListRow.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
            <div className="w-1/2 m-auto py-4 flex">
                <input onChange={e => setFilterText(e.target.value)} value={filterText} placeholder="Filtered By Search" className="border-2 border-gray-200 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                <button className="bg-red-500 hover:bg-red-700 px-2 border rounded text-white" onClick={handleClear}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
		);
	}, [filterText, resetPaginationToggle]);


    return(
        <div>
            <Sidebar />
            <div className="mt-20 flex flex-col justify-center product-admin-container md:float-right">
                <h1 className="text-4xl text-center uppercase">Product</h1>
                <div className="product-admin-table">
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
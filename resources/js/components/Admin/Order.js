import React from 'react';
import Sidebar from '../UI/Admin/Sidebar';



function AdminOrder (){
    return(
        <div>
            <Sidebar />
            <div className="mt-20 flex justify-center">
                <h1 className="text-4xl uppercase">Order</h1>
            </div>
        </div>
    );
}

export default AdminOrder;
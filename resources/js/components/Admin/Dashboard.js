import React from 'react';
import Sidebar from '../UI/Admin/Sidebar';

function adminMaster(){
    return(
        <div>
            <Sidebar />
            <div className="mt-20 flex justify-center">
                <h1 className="text-4xl uppercase">Dashboard</h1>
            </div>  
        </div>
    );
}

export default adminMaster;
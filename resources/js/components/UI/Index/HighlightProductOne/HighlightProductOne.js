import React, { useState, useEffect} from 'react';
import livingProd from '../../../../../img/sofa.png';

function HighlightProductOne(){
    return(
        <div>
            <div className="bg-blue-50 h-72 p-6 md:flex items-center justify-center space-x-6">
                <div>
                    <img src={livingProd} alt="livingProd" width="100%" className="object-contain h-36"></img>
                </div>
                <div>
                    <p>Highlight Products</p>
                    <p>Sofa One</p>
                    <p>Great Cushion</p>
                    <p>Good fot the perfect sit</p>
                </div>
            </div>   
        </div>
    );
}

export default HighlightProductOne;
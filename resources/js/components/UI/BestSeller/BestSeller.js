import React, { Component } from 'react';
import livingProd from '../../../../img/sofa.png';

class BestSeller extends Component {
    render() {
        return (
            <div style={{width:"100%"}}>
                <h1>Best Seller</h1>
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3 col-sm-6 mb-2">
                        <div className="border p-3">
                            <div className="text-center">
                                <img src={livingProd} alt="livingProd" width="100px" height="100px"></img>
                            </div>
                            <div className="text-center">
                                <h2>Sofa 1</h2>
                                <p>Home & Living</p>
                            </div>
                            <div>
                                <h2>RM1200</h2>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-sm-6 mb-2">
                        <div className="border p-3">
                            <div className="text-center">
                                <img src={livingProd} alt="livingProd" width="100px" height="100px"></img>
                            </div>
                            <div className="text-center">
                                <h2>Sofa 1</h2>
                                <p>Home & Living</p>
                            </div>
                            <div>
                                <h2>RM1200</h2>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-sm-6 mb-2">
                        <div className="border p-3">
                            <div className="text-center">
                                <img src={livingProd} alt="livingProd" width="100px" height="100px"></img>
                            </div>
                            <div className="text-center">
                                <h2>Sofa 1</h2>
                                <p>Home & Living</p>
                            </div>
                            <div>
                                <h2>RM1200</h2>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}

export default BestSeller;
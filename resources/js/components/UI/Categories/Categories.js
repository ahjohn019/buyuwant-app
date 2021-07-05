import React, { Component } from 'react';
import guitarProd from '../../../../img/guitar-prod.svg';
import cookerProd from '../../../../img/cooker.svg';
import sportsProd from '../../../../img/football.png';
import groceriesProd from '../../../../img/groceries.svg';
import clothesProd from '../../../../img/old-clothes.svg';
import livingProd from '../../../../img/sofa.png';

class categories extends Component {
    render() {
        return (
            <div style={{width:"100%"}}>
                    <h1>Categories</h1>
                    <div className="row text-center" style={{width:"100%"}}>
                        <div className="col-6 col-md-2 col-sm-6 mb-2">
                            <div style={{backgroundColor:"#f7dad9" , height:"150px"}}> 
                                <img src={guitarProd} alt="guitarProd" width="100px" height="100px"></img>
                                <div className="m-3">
                                    <p>Music</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 col-sm-6 mb-2" >
                            <div style={{backgroundColor:"#f7dad9", height:"150px"}}>
                                <img src={cookerProd} alt="cookerProd" width="100px" height="100px"></img>
                                <div className="m-3">
                                    <p>Home Appliances</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 col-sm-6 mb-2">
                            <div style={{backgroundColor:"#f7dad9", height:"150px"}}>
                                <img src={sportsProd} alt="sportsProd" width="100px" height="100px"></img>
                                <div className="m-3">
                                    <p>Sports</p>
                             </div>         
                            </div>
                        </div>
                        <div className="col-6 col-md-2 col-sm-6 mb-2">
                            <div style={{backgroundColor:"#f7dad9", height:"150px"}}>
                                <img src={groceriesProd} alt="groceriesProd" width="100px" height="100px"></img>
                                <div className="m-3">
                                    <p>Groceries</p>
                                </div>                      
                            </div>
                        </div>
                        <div className="col-6 col-md-2 col-sm-6 mb-2">
                            <div style={{backgroundColor:"#f7dad9", height:"150px"}}>
        
                                    <img src={clothesProd} alt="clothesProd" width="100px" height="100px"></img>
                                    <div className="m-3">
                                        <p>Clothes</p>
                                    </div>
                                    
                                </div>
                            </div>
                        <div className="col-6 col-md-2 col-sm-6 mb-2">
                            <div style={{backgroundColor:"#f7dad9", height:"150px"}}>
                                <img src={livingProd} alt="livingProd" width="100px" height="100px"></img>
                                <div className="m-3">
                                    <p>Home Living</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        );
    }
}

export default categories;
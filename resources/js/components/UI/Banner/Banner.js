import React, { Component } from 'react';
import caringLove from '../../../../img/caring-love.svg';
class Banner extends Component {
    render() {
        return (
            <div>
                <div style={{height:"500px",background:"linear-gradient(to left, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))"}}>
                    <div className="d-flex align-items-center h-100" >
                        <div className="bannerText mx-auto">
                            <h1 className="font-weight-bold" >LARGEST 2ND ITEMS MARKETPLACE</h1>
                            <p>CHEAPEST PRICE GURANTEE, HELP PEOPLE AS MUCH AS WE CAN DURING COVID19</p>
                            <button type="submit" className="btn btn-info font-weight-bold btn-lg">Learn More</button>
                        </div>
                        <div className="caringImg mx-auto">
                            <img src={caringLove} alt="caringLove" width="100%"></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
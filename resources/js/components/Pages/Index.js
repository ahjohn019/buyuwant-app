import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from '../../../css/Buw_master.module.css';
import NavBar from '../UI/NavBar/NavBar.js';
import Banner from '../UI/Index/Banner/Banner.js';
import Categories from '../UI/Index/Categories/Categories.js';
import BestSeller from '../UI/Index/BestSeller/BestSeller.js';
import Benefit from '../UI/Index/Benefit/Benefit.js';


class Index extends Component {
   
    render() {
        return (
            <div className={classes} >
                <NavBar />
                <Banner />
                <div className="container mx-auto body-main-height">
                    <div className="flex flex-col justify-evenly">
                        <Categories />
                        <BestSeller />
                    </div>
                    <div >
                        <Benefit />
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;

if (document.getElementById('master')) {
    ReactDOM.render(<Index />, document.getElementById('master'));
}

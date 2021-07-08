import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from '../../../css/Buw_master.module.css';
import NavBar from '../UI/NavBar/NavBar.js';
import Banner from '../UI/Banner/Banner.js';
import Categories from '../UI/Categories/Categories.js';
import BestSeller from '../UI/BestSeller/BestSeller.js';


class Buyuwant_master extends Component {
    render() {
        return (
            <div className={classes} >
                <NavBar />
                <Banner />
                <div className="container mx-auto min-h-screen">
                    <Categories />
                    <BestSeller />
                </div>
            </div>
        );
    }
}

export default Buyuwant_master;

if (document.getElementById('master')) {
    ReactDOM.render(<Buyuwant_master />, document.getElementById('master'));
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from '../../../css/Buw_master.module.css';
import NavBar from '../UI/NavBar/NavBar.js';
import Banner from '../UI/Index/Banner/Banner.js';
import Categories from '../UI/Index/Categories/Categories.js';
import BestSeller from '../UI/Index/BestSeller/BestSeller.js';
import Benefit from '../UI/Index/Benefit/Benefit.js';
import axios from 'axios';



class Index extends Component {
    componentDidMount(){
        axios.get('/api/cart/add/1').then(function(response){
            console.log(response.data)
        })
        axios.get('/api/cart/add/2').then(function(response){
            console.log(response.data)
        })
        axios.post('/api/cart/update/2').then(function(response){
            console.log(response.data)
        })
    }

    render() {
        return (
            <div className={classes} >
                <NavBar />
                <Banner />
                <div className="container mx-auto ">
                    <div className="min-h-screen flex flex-col justify-evenly">
                        <Categories />
                        <BestSeller />
                    </div>
                    <div className="min-h-screen ">
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

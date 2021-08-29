import React, { Component } from 'react';
import livingProd from '../../../../../img/sofa.png';
import guitarProd from '../../../../../img/guitar-prod.svg';
import cookerProd from '../../../../../img/cooker.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';

class BestSeller extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemsData:[]
        }
    }

    componentDidMount(){
        axios.get('/api/items').then(response => {
            this.setState({itemsData:response.data.items});
        })  
    }

    render() {
        return (
            <div className="m-8 uppercase text-center">
                <p className="text-3xl">Best Seller</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 mt-8">
                    {
                        this.state.itemsData.map((response)=> 
                            <div key={response.id} className="h-full border rounded-lg w-full md:w-3/4 mx-auto p-2">
                                <div className="h-full flex flex-col items-center w-full md:w-32 mx-auto">
                                    <div className="h-full flex items-center">
                                        <img src={livingProd} alt="livingProd" width="100%" height="100%"></img>
                                    </div>
                                    <div>
                                        <p className="text-xl">{response.name}</p>
                                        <p>{response.categories.name}</p>
                                        <p>RM {response.price}</p>
                                        <div className="flex-column md:flex">
                                            <Link to={{pathname:`/items_details/${response.id}`}}>
                                                <button className="LearnMoreBtn bg-blue-500 hover:bg-blue-700 w-20 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">view</button>
                                            </Link>
                                            <button className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-20 h-8 uppercase font-bold text-white rounded-lg text-sm " type="submit">add cart</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )
                    }
                </div>


        </div>
        );
    }
}

export default BestSeller;
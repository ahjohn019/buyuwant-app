import React, { Component } from 'react';
import axios from 'axios';

class categories extends Component {
    state= {
        categories: []
    };
    

    componentDidMount() {
        axios.get('/api/category').then(response =>{
            this.setState({categories: response.data.data});
        })
    }

    render() {
        return (
            <div className="m-8 uppercase text-center">
                    <p className="text-3xl">Categories</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
                        {
                            this.state.categories.map(category=>
                                <div key={category.id}>
                                    <div className="h-40 bg-green-200 w-full mx-auto">
                                        <div className="h-40 flex items-center mx-auto w-20">
                                            <img src={`/images/${category.img}`} alt="guitarProd" width="100%" ></img>
                                        </div>
                                        <div className="bg-green-700 text-white text-sm font-bold">
                                            {category.name}
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

export default categories;
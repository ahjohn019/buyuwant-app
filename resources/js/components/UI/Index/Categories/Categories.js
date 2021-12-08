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
                    <p className="text-4xl text-indigo-800 font-bold">Top Categories</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
                        {
                            this.state.categories.map(category=>
                                <div key={category.id} className="w-40">
                                    <div className="rounded-full h-40 w-40 bg-blue-100 flex items-center justify-center p-2 shadow-lg">
                                        <div>
                                            <img src={`/images/${category.img}`} alt={category.name} width="100%" className="object-contain h-20"></img>
                                        </div>
                                    </div>
                                    <div className="text-sm text-indigo-800 font-bold mx-auto mt-4">
                                        {category.name}
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
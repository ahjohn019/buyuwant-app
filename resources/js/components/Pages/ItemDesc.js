import React, { Component } from 'react';
import NavBar from '../UI/NavBar/NavBar.js';
import guitarProd from '../../../img/guitar-prod.svg';
import FacebookIcon from '../../../img/facebook-icon.svg';
import TwitterIcon from '../../../img/twitter-icon.svg';

class ItemDesc extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemsData:[],
            itemsQty:1,
            show:true
        }
    }

    componentDidMount(){
        let id = this.props.match.params.items_id;
        
        axios.get(`/api/items/${id}`).then((response) => {
            this.setState({itemsData:response.data});
        });
    }

    addToCart = () =>{
        let id = this.props.match.params.items_id;
        
        let authList = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('authToken='))

        if(document.cookie.indexOf(authList) == -1){
            console.log("Need authorized only can add to cart")
        } else {
            let authToken = authList.split('=')[1];
            
            axios({
                method:'post',
                url:'/api/cart/add',
                params: {items_id: id},
                headers: { 
                    'Authorization': 'Bearer '+ authToken
                  }
                }).then(function (response) {
                  console.log(response.data);
            })
        }
    }


    IncrementQty = () => {
        this.setState({ itemsQty: this.state.itemsQty + 1 });
      }
    DecreaseQty = () => {
        if(this.state.itemsQty > 1){
            this.setState({ itemsQty: this.state.itemsQty - 1 });
        } 
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }


    render() {
        return (
            <div>
                <NavBar />
                <div className="container mx-auto px-6 md:w-1/2">
                    <div className="uppercase m-2 md:m-16 flex flex-col md:flex-row border rounded-lg">
                        <div className="bg-pink-200 md:w-2/6 p-6">
                            <div className="w-1/2 mx-auto md:w-full">
                                <img src={guitarProd} alt="guitarProd" width="100%"></img>
                            </div>
                        </div>
                        <div className="space-y-4 flex flex-col justify-center mx-auto m-8 text-center md:text-left">
                            <p className="text-xl font-bold">{this.state.itemsData.name}</p>
                            <p className="text-sm">{this.state.itemsData.desc}</p>
                            <div className="flex">
                                <div className="space-x-2 flex items-center font-semibold">
                                    <div>
                                        <p>share</p>
                                    </div>
                                    <div className="flex w-8">
                                        <img src={FacebookIcon} alt="guitarProd" ></img>
                                        <img src={TwitterIcon} alt="guitarProd" ></img>   
                                    </div>
                                </div>
                                <div className="flex items-center font-semibold m-auto mr-0">
                                    <p>120 sold</p>
                                </div>         
                            </div>
                            
                            <p className="text-2xl font-bold">RM {this.state.itemsData.price}</p>
                            <div className="flex">
                                <div className="m-auto ml-0">
                                    <p className="text-sm">quantity</p>
                                </div>
                                <div className="space-x-6 flex">
                                    <div className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-200">
                                        <button onClick={this.DecreaseQty}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div >
                                       { this.state.show ? <p className="text-2xl">{ this.state.itemsQty }</p> : '' }
                                    </div>
                                    <div className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-200">
                                        <button onClick={this.IncrementQty}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center md:flex-row md:space-x-4 ">
                                <div>
                                    <button className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-32 h-10 uppercase font-bold text-white rounded-lg text-sm " type="submit">purchase</button>
                                </div>
                                <div className="flex space-x-4 mt-2 md:mt-0">
                                    <button onClick={this.addToCart} className="LearnMoreBtn bg-red-500 hover:bg-red-700 w-32 h-10 uppercase font-bold text-white rounded-lg text-sm " type="submit">Add to Cart</button>
                                    <button className="LearnMoreBtn bg-gray-200 hover:bg-red-700 w-12 h-10 rounded-lg " type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div className="space-y-4 border p-8">
                        <p className="uppercase text-2xl font-semibold ">items description</p>
                        <hr />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus, metus et sodales pulvinar, justo enim sodales justo, at tincidunt lorem eros non ex. Morbi sed sollicitudin ante. Aliquam accumsan turpis vel risus lacinia pharetra. Integer quis sem viverra, fringilla eros vel, congue lectus. Aliquam erat volutpat. Nulla facilisi. Integer eget enim venenatis, facilisis urna ac, vestibulum velit. Cras tristique quam vitae est iaculis, a dignissim nisi vestibulum. Integer aliquam enim vel sagittis sollicitudin. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec id pharetra nulla. Nulla eget lacus porta ante accumsan interdum. Praesent venenatis facilisis metus, eget cursus tortor suscipit ac. Sed viverra orci a justo mattis sollicitudin. Vivamus sed libero vitae purus suscipit imperdiet ut hendrerit ex.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemDesc;
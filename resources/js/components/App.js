
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from './Pages/Index'
import ItemDesc from '../components/Pages/ItemDesc'
import Login from '../components/UI/Authentication/Login'
import Register from '../components/UI/Authentication/Register'
import Checkout from '../components/Pages/Checkout'
import Payment from '../components/Pages/Payment'
import UserProfile from '../components/Pages/UserProfile'
import AdminDashboard from './Admin/Dashboard'
import AdminProduct from '../components/Admin/Product'
import AdminOrder from '../components/Admin/Order'

class App extends Component {
    

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/items_details/:items_id" component={ItemDesc}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/payment" component={Payment} />
                    <Route path="/user-profile" component={UserProfile} />
                    <Route exact path="/admin" component={AdminDashboard} />
                    <Route path="/admin/product" component={AdminProduct} />
                    <Route path="/admin/order" component={AdminOrder} />
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
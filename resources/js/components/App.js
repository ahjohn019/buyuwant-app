
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
import ResetPassword from '../components/UI/Authentication/ForgotPassword'
import ProtectedRoute from '../components/ProtectedRoute'

class App extends Component {
    

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/items_details/:items_id" component={ItemDesc}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/checkout" component={Checkout} />
                    <ProtectedRoute path="/payment" component={Payment} />
                    <ProtectedRoute path="/user-profile" component={UserProfile} />
                    <Route exact path="/admin" component={AdminDashboard} />
                    <Route path="/admin/product" component={AdminProduct} />
                    <Route path="/admin/order" component={AdminOrder} />
                    <Route exact path="/password/reset" component={ResetPassword} />
                    <Route path="/password/reset/:token/:email" component={ResetPassword} />
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
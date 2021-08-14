
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from './Pages/Index'
import ItemDesc from '../components/Pages/ItemDesc'
import Login from '../components/UI/Authentication/Login'
import Register from '../components/UI/Authentication/Register'
import Checkout from '../components/Pages/Checkout'

class App extends Component {
    render () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route path="/itemDesc" component={ItemDesc}/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
        </BrowserRouter>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
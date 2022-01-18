import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./Pages/Index";
import ItemDesc from "../components/Pages/ItemDesc";
import Login from "../components/UI/Authentication/Login";
import Register from "../components/UI/Authentication/Register";
import Checkout from "../components/Pages/Checkout";
import Payment from "../components/Pages/Payment";
import UserProfile from "../components/Pages/UserProfile";
import AdminDashboard from "./Admin/Dashboard";
import AdminProduct from "../components/Admin/Product";
import AdminOrder from "../components/Admin/Order/MainPages";
import AdminOrderDetails from "../components/Admin/Order/Details";
import ResetPassword from "../components/UI/Authentication/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import CategoriesDetails from "../components/Pages/Categories";
import AdminLogin from "../components/Admin/Login/Login";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route
                        path="/items_details/:items_id"
                        component={ItemDesc}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/checkout" component={Checkout} />
                    <ProtectedRoute path="/payment" component={Payment} />
                    <ProtectedRoute
                        path="/user-profile"
                        component={UserProfile}
                    />
                    <ProtectedAdminRoute
                        exact
                        path="/admin"
                        component={AdminDashboard}
                    />
                    <Route path="/admin/login" component={AdminLogin} />
                    <ProtectedAdminRoute
                        path="/admin/product"
                        component={AdminProduct}
                    />
                    <ProtectedAdminRoute
                        path="/admin/order"
                        component={AdminOrder}
                    />
                    <ProtectedAdminRoute
                        path="/admin/order_details/:order_id"
                        component={AdminOrderDetails}
                    />
                    <Route
                        exact
                        path="/password/reset"
                        component={ResetPassword}
                    />
                    <Route
                        path="/password/reset/:token/:email"
                        component={ResetPassword}
                    />
                    <Route
                        path="/categories/:categories_id"
                        component={CategoriesDetails}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

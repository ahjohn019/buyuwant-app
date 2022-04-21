import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./FrontEnd/Index";
import Description from "./FrontEnd/Description";
import Login from "../components/UI/Authentication/Login";
import Register from "../components/UI/Authentication/Register";
import Checkout from "./FrontEnd/Checkout";
import Payment from "./FrontEnd/Payment";
import UserProfile from "./FrontEnd/Profile";
import AdminDashboard from "./Admin/Dashboard";
import AdminProduct from "../components/Admin/Product/Product";
import AdminAddProduct from "./Admin/Product/Add";
import AdminProductDetails from "./Admin/Product/Details";
import AdminOrder from "../components/Admin/Order/MainPages";
import AdminOrderDetails from "../components/Admin/Order/Details";
import ResetPassword from "../components/UI/Authentication/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import CategoriesDetails from "./FrontEnd/Categories";
import AdminLogin from "../components/Admin/Login/Login";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
    render() {
        Sentry.init({
            dsn:
                "https://fd69b96629024584a36aefac30262bb8@o1141534.ingest.sentry.io/6200038",
            integrations: [new BrowserTracing()],

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0
        });

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route
                        path="/items_details/:items_id"
                        component={Description}
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
                        path="/admin/product-details/add"
                        component={AdminAddProduct}
                    />
                    <ProtectedAdminRoute
                        path="/admin/product-details/:product_id"
                        component={AdminProductDetails}
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

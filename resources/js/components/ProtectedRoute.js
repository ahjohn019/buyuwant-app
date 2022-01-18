import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthToken from "../components/Helper/AuthToken/AuthToken";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = AuthToken();

    return (
        <Route
            {...restOfProps}
            render={props =>
                isAuthenticated < 0 ? (
                    <Redirect to="/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default ProtectedRoute;

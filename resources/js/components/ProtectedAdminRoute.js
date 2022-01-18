import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthToken from "../components/Helper/AuthToken/AuthToken";

function ProtectedAdminRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = AuthToken();

    let [roleAuth, setRoleAuth] = useState("");

    if (isAuthenticated < 0) {
        return <Redirect to="/admin/login" />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await axios.get(`/api/auth/user-profile`, {
                    headers: { Authorization: "Bearer " + isAuthenticated }
                });

                setRoleAuth(userProfile.data.user_role.name);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (roleAuth.length <= 0) return null;

    return (
        <Route
            {...restOfProps}
            render={props =>
                roleAuth === "customer" ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default ProtectedAdminRoute;

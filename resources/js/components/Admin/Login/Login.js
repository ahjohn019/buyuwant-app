import React, { useState } from "react";
import Sidebar from "../../UI/Admin/Sidebar";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const handleLoginChange = prop => event => {
        event.preventDefault();
        setLoginInfo({ ...loginInfo, [prop]: event.target.value });
    };

    let history = useHistory();

    const handleLogin = async event => {
        event.preventDefault();
        try {
            await axios
                .post("/api/auth/login", loginInfo)
                .then(function(response) {
                    var now = new Date();
                    var time = now.getTime();
                    time += response.data.expires_in * 1000;
                    now.setTime(time);

                    document.cookie =
                        "authToken=" +
                        response.data.access_token +
                        "; expires=" +
                        now.toUTCString() +
                        "; path=/";
                    history.push("/admin");
                });
        } catch (err) {
            console.log(err);
            setErrStatus(err.response.status);
            if (err.response.status == 422) {
                setErrorMessage(err.response.data.password);
            }
            if (err.response.status == 401) {
                setLoginError(err.response.data.error);
            }
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="w-full max-w-lg m-auto flex flex-col justify-center min-h-screen">
                <p className="text-2xl text-center">Login</p>
                <form
                    onSubmit={handleLogin}
                    className="bg-white shadow-md rounded p-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email"
                            onChange={handleLoginChange("email")}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none "
                            id="password"
                            type="password"
                            placeholder="******************"
                            onChange={handleLoginChange("password")}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2022 Buy U Want. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuardedRoute = () => {
    let isLogged = localStorage.getItem("token");

    if (!isLogged) {
        return <Navigate to="/login" />
    }

    return (
        <Outlet />
    )

}

export default GuardedRoute;
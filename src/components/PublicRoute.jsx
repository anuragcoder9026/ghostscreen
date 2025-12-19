import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <div className="text-center text-white">Loading...</div>;

    if (isLoggedIn) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default PublicRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">Loading your profile...</p>
        </div>
    </div>;

    if (isLoggedIn) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default PublicRoute;

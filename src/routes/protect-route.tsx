import { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const {  isLoading, fetchUser, isAuthenticated } = useAuth();
    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loader until auth state is ready
    }
    if (!isAuthenticated && !isLoading) {
        // console.log("Is user authenticated", isAuthenticated, isLoading, isAuthLoading);
        return <Navigate to="/" />;
    }

    if (isAuthenticated && !isLoading) {
        return <>{children}</>;
    }
};

export default ProtectedRoute
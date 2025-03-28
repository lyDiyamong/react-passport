import { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, setAccessToken } = useAuth();
    useEffect(() => {
        // On page load, try to refresh the token
        const refreshToken = async () => {
          try {
            const response = await axios.get<{data: {access_token: string}}>('/refresh-token', { withCredentials: true });
            setAccessToken(response.data?.data?.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data?.data?.access_token}`;
          } catch (error) {
            console.error("Refresh failed", error);
            // Redirect to login if refresh fails
          }
        };
    
        refreshToken();
      }, []);
   
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute
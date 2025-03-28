import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth-context"; 
import { AuthTabs } from "./components/auth/auth-tabs";
import { Dashboard } from "./components/dashboard/dashboard";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                        <div className="w-full max-w-md">
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    Welcome
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Sign in to your account or create a new one
                                </p>
                            </div>
                            <AuthTabs />
                        </div>
                    </div>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;

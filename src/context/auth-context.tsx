import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user.type";

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    login: (token: string) => void;
    user: User | null;
    logout: () => void;
    isAuthenticated: boolean;
    axiosInstance: AxiosInstance;
    fetchUser: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

interface TokenPayload {
    exp: number;
}

// Create axios instance with default configuration
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: "http://localhost:8000/api/v1",
        withCredentials: true,
    });

    return instance;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const axiosInstance = createAxiosInstance();

    const isAuthenticated = !!accessToken;

    const isTokenExpired = useCallback((token: string): boolean => {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            return decoded.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }, []);
    useEffect(() => {
        console.log("access token", accessToken);
    }, [accessToken]);

    const refreshAccessToken = useCallback(async (): Promise<string | null> => {
        setIsRefreshing(true);
        try {
            const response = await axiosInstance.get<{ access_token: string }>(
                "/refresh"
            );
            const newAccessToken = response.data?.data?.access_token;
            console.log("");
            setAccessToken(newAccessToken);
            return newAccessToken;
        } catch (err) {
            setError("Failed to refresh token");
            logout();
            return null;
        } finally {
            setIsRefreshing(false);
        }
    }, [axiosInstance]);

    // Configure axios request interceptor
    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                // if (!accessToken) return config;

                if (!accessToken) {
                    try {
                        const newToken = await refreshAccessToken();
                        console.log("new token", newToken);
                        if (newToken) {
                            config.headers = config.headers || {};
                            config.headers.Authorization = `Bearer ${newToken}`;
                        }
                    } catch {
                        logout();
                        throw new Error("Session expired. Please login again.");
                    }
                } else {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error: any) => Promise.reject(error)
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
    }, [accessToken, axiosInstance, isTokenExpired, refreshAccessToken]);

    const login = useCallback((token: string) => {
        setAccessToken(token);
        setError(null);
    }, []);

    const logout = useCallback(() => {
        setAccessToken(null);
        setUser(null);
        setError(null);
        // Clear authorization header
        delete axiosInstance.defaults.headers.common["Authorization"];
    }, [axiosInstance]);

    const fetchUser = async () => {
        // if (isLoading) return; // Prevent multiple simultaneous fetches
        setIsLoading(true);
        // setIsRefreshing(true);
        console.log("REfresh the token");

        try {
            let token = accessToken;

            // Wait for token refresh if it's missing or expired
            if (!token || isTokenExpired(token)) {
                console.log("token expired");
                
                token = await refreshAccessToken();
                console.log("token expired refreshAccessToken");

                if (!token) return; // Exit early if refresh failed
            }

            // Set Authorization header explicitly before fetching user
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;

            const response = await axiosInstance.get<{ data: User }>("/me");
            setUser(response.data.data);
        } catch (err) {
            setError("Failed to fetch user data");
            logout();
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };


    const value = {
        accessToken,
        setAccessToken,
        login,
        user,
        logout,
        axiosInstance,
        fetchUser,
        isLoading,
        error,
        // isRefreshing,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

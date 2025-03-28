import { useState } from "react";
import { useAuth } from "../context/auth-context";

export const getUsers = async () => {
    const { axiosInstance } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    try {
        setLoading(true);
        const response = await axiosInstance.get("/users");
        setData(response.data);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    } finally {
        setLoading(false);
    }
};

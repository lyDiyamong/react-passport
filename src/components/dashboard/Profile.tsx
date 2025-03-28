import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";
export const Profile = () => {
    const { user, fetchUser } = useAuth();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return <div>{user?.name}</div>;
};

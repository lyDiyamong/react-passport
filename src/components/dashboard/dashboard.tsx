import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    LayoutDashboard,
    User,
    Settings,
    FileText,
    LogOut,
} from "lucide-react";
export function Dashboard() {
    const { user, isAuthenticated, logout, fetchUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // const { data, loading: loadingUsers } = getUsers();

    // useEffect(() => {
    //     // if (!isAuthenticated) {
    //     //     navigate("/");
    //     //     return;
    //     // }

    //     const loadUser = async () => {
    //         try {
    //             await fetchUser();
    //         } catch (error) {
    //             console.error("Failed to fetch user:", error);
    //             logout();
    //             navigate("/");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadUser();
    // }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="hidden sm:flex w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                </div>
                <div className="flex flex-col flex-1 p-4 space-y-2">
                    <Button variant="ghost" className="justify-start">
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-5 w-5" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="justify-start">
                        <FileText className="mr-2 h-5 w-5" />
                        Reports
                    </Button>
                    <Button variant="ghost" className="justify-start">
                        <Settings className="mr-2 h-5 w-5" />
                        Settings
                    </Button>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        variant="ghost"
                        className="justify-start w-full"
                        onClick={logout}
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                <div className="mb-6">
                    {!loading && (
                        <>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                Welcome, {user?.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Here's what's happening with your account today.
                            </p>
                        </>
                        
                    )}
                    {/* <Button onClick={() => getUsers()}>Fetch Users</Button> */}

                    {/* {loadingUsers && <p>Loading...</p>}
                    {data && <p>{data.length} users found</p>} */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                            <CardDescription>
                                Your recent activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>No recent activity to show.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Stats</CardTitle>
                            <CardDescription>
                                Your account statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>No statistics available yet.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks</CardTitle>
                            <CardDescription>
                                Your pending tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>No pending tasks.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

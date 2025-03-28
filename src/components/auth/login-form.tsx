import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginValues = z.infer<typeof loginSchema>;

// Define the expected response type
interface LoginResponse {
    
    // Add other fields as needed
}

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login, axiosInstance } = useAuth();
    const navigate = useNavigate();

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "diyamong@gmail.com",
            password: "pass1234",
        },
    });

    async function onSubmit(data: LoginValues) {
        setIsLoading(true);
        setError("");
      
        try {
          const response = await axiosInstance.post<LoginResponse>("/login", {
            ...data,
          });

        //   console.log("Token: ", response.data.data.access_token);
      
          // Save the access token and user data
          login(response.data.data.access_token);
      
          // Redirect to dashboard
          navigate("/dashboard");
        } catch (error) {
          console.error(error);
          setError(
            "Login failed. Please check your credentials and try again."
          );
        } finally {
          setIsLoading(false);
        }
      }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...form.register("password")}
                            />
                            {form.formState.errors.password && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
                <div className="text-sm text-muted-foreground">
                    <span className="mr-1">Forgot your password?</span>
                    <Button variant="link" className="p-0 h-auto">
                        Reset it
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

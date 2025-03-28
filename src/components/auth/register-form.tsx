import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import axios from "axios";

const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters" }),
        email: z
            .string()
            .email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    async function onSubmit(data: RegisterValues) {
        setIsLoading(true);
        // In a real app, you would send this data to your API for registration
        console.log(data);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/register",
                data,
                {
                    withCredentials: true,
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information to create a new account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...form.register("name")}
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>
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
                        <div className="space-y-1">
                            <Label htmlFor="confirm_password">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm_password"
                                type="password"
                                {...form.register("confirm_password")}
                            />
                            {form.formState.errors.confirm_password && (
                                <p className="text-sm text-red-500">
                                    {
                                        form.formState.errors.confirm_password
                                            .message
                                    }
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
                            {isLoading
                                ? "Creating account..."
                                : "Create Account"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center text-muted-foreground w-full">
                    By creating an account, you agree to our Terms of Service
                    and Privacy Policy.
                </p>
            </CardFooter>
        </Card>
    );
}

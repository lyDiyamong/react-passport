import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthTabs() {
    return (
        <Tabs defaultValue="login" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    );
}

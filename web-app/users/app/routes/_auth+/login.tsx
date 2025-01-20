import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { Link, useNavigate } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Login",
    },
    {
      name: "description",
      content: "Login page",
    },
  ];
};

type Res = {
  data: User;
};

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
    try {
      const { data } = await axiosInstance.post<Res>(
        "/api/auth/login",
        formData,
      );
      if (data.data) {
        setUser(data.data);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      form.setError("root", {
        message: (error as Error).message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end">
              <Link to="/forgot-password" className="text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button
          type="button"
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
        >
          {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
        <Button
          type="button"
          className="w-full"
          variant="secondary"
          onClick={() => {
            form.setValue("email", "user@edulearn.com");
            form.setValue("password", "User@123");
          }}
        >
          Guest User
        </Button>
      </CardFooter>
    </Card>
  );
}

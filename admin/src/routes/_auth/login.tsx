import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SessionStorage } from "@/config/constants";
import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";
import { FormInputField } from "@/components/ui/FormInputField";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Login",
        },
        {
          name: "description",
          content: "Login to your account",
        },
      ],
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (values) => {
    try {
      const { data } = await axiosInstance.post<{
        user: User;
        accessToken: string;
      }>("/api/auth/login", values);

      if (data?.status) {
        sessionStorage.setItem(SessionStorage.IS_LOGGED_IN, "true");
        setUser((prev) => {
          return {
            ...prev,
            ...data.data.user,
          };
        });

        navigate({ to: "/dashboard" });
      } else {
        form.setError("root", {
          type: "manual",
          message: "Something went wrong",
        });
      }
    } catch (error) {
      const err = (error as Error).message;
      form.setError("root", {
        type: "manual",
        message: err,
      });
      sessionStorage.removeItem(SessionStorage.IS_LOGGED_IN);
      setUser(null);
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="gopal@gmail.com"
              inputProps={{
                type: "email",
              }}
            />

            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="********"
              inputProps={{
                type: "password",
                eye: true,
              }}
            />

            <p className="text-end text-sm">
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-500 underline underline-offset-4"
              >
                Click here
              </Link>
            </p>

            {form.formState.errors.root && (
              <div className="text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <CardFooter className="flex-col gap-4 px-0">
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting
                  ? "Signing in..."
                  : "Sign In"}
              </Button>
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                onClick={() => {
                  form.setValue("email", "admin@edulearn.com");
                  form.setValue("password", "Admin@123");
                }}
              >
                Guest Admin
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

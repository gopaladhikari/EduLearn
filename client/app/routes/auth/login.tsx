import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Link,
  type ActionFunction,
  useSubmit,
  useNavigation,
  useActionData,
  redirect,
  Form,
} from "react-router";
import { Button, buttonVariants } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginSchema } from "~/schemas/user.schema";
import { useState } from "react";
import { api } from "~/lib/axios";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { useUserStore } from "~/store/userStore";
import { cn, handleActionError } from "~/lib/utils";
import type { User } from "../../../types/user.t";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";

export function meta() {
  return [
    { title: "Login - Edulearn" },
    { name: "description", content: "Login to your account" },
  ];
}

interface Result {
  user: User;
}

export const clientAction: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";

  try {
    const formData = await request.formData();

    const result = await api.post<Result>(
      "/api/v1/user/login",
      Object.fromEntries(formData)
    );

    if (result.data.success)
      useUserStore.getState().setUser(result.data.data.user);

    return redirect(redirectTo);
  } catch (error) {
    return handleActionError(error);
  }
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigation();

  const actionData = useActionData<ApiError | ApiSuccess>();

  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const isSubmitting = navigator.state === "submitting";

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    submit(data, { method: "post" });
  };

  return (
    <section className="w-full max-w-md">
      <Card className="p-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mb-8 text-muted-foreground">
          Sign in to your account to continue learning
        </p>

        <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <FieldGroup>
            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="login-email">Email address</FieldLabel>
              <Input
                id="login-email"
                placeholder="you@example.com"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </Field>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </FieldGroup>

          {actionData?.success === false && (
            <p className="mt-1 text-sm text-destructive">
              {actionData.message}
            </p>
          )}

          {actionData?.success === true && (
            <p className="text-success mt-1 text-sm">{actionData.message}</p>
          )}

          {/* Sign In Button */}
          <Button
            type="submit"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full text-black"
            )}
            disabled={isSubmitting}
          >
            Sign in
          </Button>

          <Button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full text-black"
            )}
            disabled={isSubmitting}
            onClick={() => {
              onSubmit({
                email: "student@edulearn.com",
                password: "Student123",
              });
            }}
          >
            Login as a student
          </Button>
          <Button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full text-black"
            )}
            disabled={isSubmitting}
            onClick={() => {
              onSubmit({
                email: "admin@edulearn.com",
                password: "Admin@123",
              });
            }}
          >
            Login as a Admin
          </Button>
          <Button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full text-black"
            )}
            disabled={isSubmitting}
            onClick={() => {
              onSubmit({
                email: "instructor@edulearn.com",
                password: "Instructor@123",
              });
            }}
          >
            Login as a Instructor
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">
              Don&apos;t have an account?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Link to="/register" className={cn(buttonVariants(), "w-full")}>
          Create account
        </Link>
      </Card>

      {/* Footer Links */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          By signing in, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            className="text-primary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
}

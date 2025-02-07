import { Form, redirect, data as response } from "react-router";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";

import {
  cn,
  commitSession,
  destroySession,
  getSession,
} from "@/lib/utils";
import type { Route } from "./+types/login";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "Sign In to EduLearn | Access Your Learning Dashboard",
      description:
        "Welcome back! Securely log in to your EduLearn account to resume your courses, track progress, and connect with instructors.",
    },
    {
      name: "og:title",
      content: "Sign In to EduLearn – Continue Your Learning Journey",
    },
    {
      name: "og:description",
      content:
        "Access personalized courses, certificates, and resources. Your next skill is just a login away!",
    },
  ];
};

const resolver = zodResolver(loginSchema);

export const action = async ({ request }: Route.ActionArgs) => {
  const { data, errors } = await getValidatedFormData(
    request,
    resolver,
  );

  const session = await getSession(request.headers.get("Cookie"));

  try {
    if (errors) throw new Error(errors?.root?.message);
    const { data: res } = await axiosInstance.post<{
      user: User;
      accessToken: string;
    }>("/api/auth/login", data);

    const { user, accessToken } = res.data;

    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${accessToken}`;

    session.set("user", user);
    session.set("acessToken", accessToken);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    session.flash("error", (error as Error).message);
    return response(error as Error, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};

export default function Login({ actionData }: Route.ComponentProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useRemixForm<LoginSchema>({
    resolver,
    mode: "onSubmit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={handleSubmit}
          method="post"
          navigate={false}
          className="space-y-4"
        >
          <div className="space-y-3">
            <Label
              htmlFor="email"
              className={cn(
                "text-lg",
                errors.email && "text-destructive",
              )}
            >
              Email
            </Label>
            <Input
              type="email"
              disabled={isSubmitting}
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              disabled={isSubmitting}
              type="password"
              id="password"
              placeholder="********"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {actionData?.message && (
            <p className="text-destructive">{actionData.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => {
              setValue("email", "user@edulearn.com");
              setValue("password", "User@123");
            }}
          >
            Guest User
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}

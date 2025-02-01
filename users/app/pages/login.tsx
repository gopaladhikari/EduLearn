import {
  Form,
  redirect,
  useActionData,
  type ActionFunction,
  type MetaFunction,
} from "react-router";
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
import { cn, commitSession, destroySession, getSession } from "@/lib/utils";

export const meta: MetaFunction = () => {
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

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const { data, errors } = await getValidatedFormData(request, resolver);

  const session = await getSession(request.headers.get("Cookie"));

  try {
    if (errors) throw new Error(errors?.root?.message);
    const {
      data: { data: user },
    } = await axiosInstance.post<User>("/api/auth/login", data);

    session.set("user", user);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      {
        status: 401,
        headers: { "Set-Cookie": await destroySession(session) },
      },
    );
  }
};

export default function Login() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useRemixForm<LoginSchema>({
    resolver,
    mode: "onSubmit",
  });

  const error = useActionData<typeof action>() as Error;

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
              className={cn("text-lg", errors.email && "text-destructive")}
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
              <p className="text-destructive">{errors.email.message}</p>
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
              <p className="text-destructive">{errors.password.message}</p>
            )}
          </div>

          {error?.message && (
            <p className="text-destructive">{error.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
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

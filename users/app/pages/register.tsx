import { Form } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";
import type { Route } from "./+types/register";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "Join EduLearn | Create Your Free Learning Account",
      description:
        "Unlock a world of knowledge! Sign up for EduLearn to explore free and paid courses, connect with teachers, and start learning today.",
    },
    {
      name: "og:title",
      content: "Join EduLearn – Start Learning for Free",
    },
    {
      name: "og:description",
      content:
        "Create your account and gain instant access to expert-led courses in tech, business, design, and more. Your future begins here.",
    },
  ];
};

const resolver = zodResolver(registerSchema);

export const action = async ({ request }: Route.ActionArgs) => {
  const { data, errors } = await getValidatedFormData(
    request,
    resolver,
  );

  if (errors) throw new Error(errors?.root?.message);

  try {
    const { data: result } = await axiosInstance.post<User>(
      "/api/users",
      {
        data: {
          ...data,
          role: "user",
        },
      },
    );

    return result;
  } catch (error) {
    return error as Error;
  }
};

export default function Register({
  actionData,
}: Route.ComponentProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useRemixForm<RegisterSchema>({
    resolver,
    mode: "onSubmit",
  });

  const isError = actionData instanceof Error;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Register</CardTitle>
        <CardDescription>
          Enter your full name, email and password to register.
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
              htmlFor="fullName"
              className={cn(
                "text-lg",
                errors?.fullName && "text-destructive",
              )}
            >
              Full Name
            </Label>
            <Input
              disabled={isSubmitting}
              id="fullName"
              placeholder="example@gmail.com"
              {...register("fullName", { required: true })}
            />
            {errors.email && (
              <p className="text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
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
            <Label
              htmlFor="password"
              className={cn(
                "text-lg",
                errors.email && "text-destructive",
              )}
            >
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
            <p
              className={cn(
                isError ? "text-destructive" : "text-green-500",
              )}
            >
              {actionData?.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}

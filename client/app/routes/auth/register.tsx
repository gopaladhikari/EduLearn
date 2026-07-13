import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSubmit,
  type ActionFunction,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import { registerSchema, type RegisterSchema } from "~/schemas/user.schema";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Checkbox } from "~/components/ui/checkbox";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { PasswordRequirement } from "./components/password-requirement";

export function meta() {
  return [
    { title: "Register - Edulearn" },
    { name: "description", content: "Register to your account" },
  ];
}

export const clientAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const { data } = await api.post(
      "/api/v1/user/register",
      Object.fromEntries(formData)
    );

    return data;
  } catch (error) {
    return handleActionError(error);
  }
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const actionData = useActionData<ApiSuccess | ApiError>();

  const navigation = useNavigation();

  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getFieldState,
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    submit(data, { method: "POST" });
  };

  const isSubmitting = navigation.state === "submitting";

  const password = watch("password");

  useEffect(() => {
    if (actionData?.success) reset();

    return () => {
      reset();
    };
  }, [actionData?.success]);

  return (
    <section className="w-full max-w-md">
      <Card className="p-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Create account
        </h1>
        <p className="mb-8 text-muted-foreground">
          Join thousands of students learning with Edulearn
        </p>

        <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Username Field */}
            <Field>
              <FieldLabel htmlFor="register-username">username</FieldLabel>
              <Input
                id="register-username"
                placeholder="edulearn"
                {...register("username")}
                aria-invalid={!!errors.username}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </Field>

            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="register-email">Email address</FieldLabel>
              <Input
                id="register-email"
                type="email"
                placeholder="you@example.com"
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
              <FieldLabel htmlFor="register-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password"
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

              {/* Password Requirements */}
              <PasswordRequirement password={password} />
            </Field>

            {/* Confirm Password Field */}
            <Field>
              <FieldLabel htmlFor="register-confirmPassword">
                Confirm password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="register-confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>

            {/* Terms & Conditions */}
            <Field orientation="horizontal">
              <Checkbox
                id="terms"
                {...register("terms")}
                disabled={isSubmitting}
                aria-invalid={getFieldState("terms")?.invalid}
                onCheckedChange={(value) => {
                  const str = String(value) === "true";
                  setValue("terms", str);
                }}
              />

              <FieldLabel htmlFor="terms" className="font-normal">
                I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </FieldLabel>
            </Field>
            {errors.terms && (
              <p className="text-sm text-destructive">{errors.terms.message}</p>
            )}

            {actionData?.success ? (
              <div className="rounded-xl bg-green-500/10 p-4 text-green-900">
                <p className="font-bold">{actionData.message}</p>
                {/* @ts-expect-error - actionData.data exists */}
                <p className="text-sm">{actionData.data?.message}</p>
              </div>
            ) : (
              <p className="text-sm text-destructive">{actionData?.message}</p>
            )}

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </FieldGroup>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <Link to="/login" className="block w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary/5"
          >
            Sign in
          </Button>
        </Link>
      </Card>
    </section>
  );
}

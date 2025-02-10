import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  confirmPasswordSchema,
  ConfirmPasswordSchema,
} from "@/schemas/confirm-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInputField } from "@/components/ui/FormInputField";
import { Form } from "@/components/ui/form";
import { axiosInstance } from "@/config/axios";

export const Route = createFileRoute("/_auth/confirm-password")({
  component: RouteComponent,
  validateSearch: (search) => {
    const token = search?.token;

    return {
      token: String(token) || "",
    };
  },
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  const form = useForm<ConfirmPasswordSchema>({
    resolver: zodResolver(confirmPasswordSchema),
  });

  const onSubmit: SubmitHandler<ConfirmPasswordSchema> = async (
    formdata,
  ) => {
    try {
      console.log(formdata);
      const { data } = await axiosInstance.patch(
        `/api/auth/forgot-password/${token}`,
        formdata,
      );

      if (data?.status) navigate({ to: "/login" });
    } catch (error) {
      const err = (error as Error).message;

      form.setError("root", {
        type: "manual",
        message: err,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Confirm Password</CardTitle>
        <CardDescription>
          Enter your email, password and confirm password to update
          your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="admin@edulearn.com"
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

            <FormInputField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
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

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting
                ? "Confirming..."
                : "Confirm"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

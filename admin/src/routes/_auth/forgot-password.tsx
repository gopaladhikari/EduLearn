import { useSeo } from "@/hooks/useSeo";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form } from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schemas/auth.schema";
import { FormInputField } from "@/components/ui/FormInputField";
import { axiosInstance } from "@/config/axios";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  useSeo({
    title: "Forgot Password",
    description: "Forgot Password",
  });

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (
    values,
  ) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/forgot-password",
        values,
      );

      if (data?.status) {
        form.clearErrors();
        form.reset({
          email: "",
        });

        setTimeout(() => {
          form.clearErrors();
        }, 5_000);
        form.setError("root", {
          type: "success",
          message: data.message,
        });
      } else {
        form.clearErrors();
        form.setError("root", {
          type: "error",
          message: "Something went wrong",
        });
      }
    } catch (error) {
      const err = (error as Error).message;

      form.setError("root", {
        type: "error",
        message: err,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="admin@edulearn.com"
              inputProps={{
                type: "email",
              }}
            />

            {form.formState.errors.root?.type === "error" && (
              <div className="text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            {form.formState.errors.root?.type === "success" && (
              <div className="text-green-600">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

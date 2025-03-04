import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth.schema";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/config/axios";
import { FormInputField } from "@/components/ui/FormInputField";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Register",
        },
        {
          name: "description",
          content: "Create a new account",
        },
      ],
    };
  },
});

function RouteComponent() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (values) => {
    try {
      const { data } = await axiosInstance.post("/api/users", {
        ...values,
        role: "admin",
      });

      return data;
    } catch (error) {
      const err = (error as Error).message;

      form.setError("email", {
        type: "manual",
        message: err,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Create New Account</CardTitle>
        <CardDescription>
          Enter your email and password to sign up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInputField
              control={form.control}
              name="fullName"
              label="Your full name"
              placeholder="Gopal Adhikari"
              inputProps={{
                type: "email",
              }}
            />

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

            {form.formState.errors.root && (
              <div className="text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            {form.formState.isSubmitSuccessful && (
              <div className="text-green-600">
                Verfication email sent to {form.getValues("email")}
              </div>
            )}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

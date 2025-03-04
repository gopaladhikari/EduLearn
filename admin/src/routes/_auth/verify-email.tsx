import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailSchema,
  type VerifyEmailSchema,
} from "@/schemas/auth.schema";
import { FormInputField } from "@/components/ui/FormInputField";

export const Route = createFileRoute("/_auth/verify-email")({
  component: RouteComponent,

  validateSearch: (search) => {
    const token = search?.token;

    return {
      token: String(token) || "",
    };
  },
  head: () => {
    return {
      meta: [
        {
          title: "Verfiy Email",
        },
        {
          name: "description",
          content: "Verify your edulearn registered email",
        },
      ],
    };
  },
});

function RouteComponent() {
  const { token } = Route.useSearch();

  const form = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit: SubmitHandler<VerifyEmailSchema> = async (
    values,
  ) => {
    console.log(values, token);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Verify Email</CardTitle>
        <CardDescription>
          Enter your email to verify your account.
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
              placeholder="gopal@gmail.com"
              inputProps={{
                type: "email",
              }}
            />

            {form.formState.errors.root && (
              <div className="text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            {form.formState.isSubmitSuccessful && (
              <div className="text-green-600">{}</div>
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

            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting
                  ? "Signing in..."
                  : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

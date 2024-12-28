import { useSeo } from "@/hooks/useSeo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { requestForgotPassword } from "@/lib/mutations/auth.mutation";

export const Route = createFileRoute("/_auth/_layout/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useMutation({
    mutationFn: requestForgotPassword,
    onSuccess() {
      form.reset();
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.email);
    },
  });

  useSeo({
    title: "Forgot Password",
    description: "Forgot Password",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3">
          <div className="space-y-3">
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "A first name is required"
                    : value.length < 3
                      ? "First name must be at least 3 characters"
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in first name'
                  );
                },
              }}
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="email"
                      onBlur={field.handleBlur}
                      placeholder="Enter your email"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                );
              }}
            />
          </div>

          <div className="text-end">
            <Link to="/login" className="text-sm hover:underline">
              Login ?
            </Link>
          </div>
          {mutation.error && (
            <p className="text-destructive">{mutation.error.message}</p>
          )}
          {mutation.isSuccess && (
            <div className="text-green-600">{mutation.data.message}</div>
          )}
        </form>
      </CardContent>

      <CardFooter>
        <Button type="button" className="w-full" onClick={form.handleSubmit}>
          {form.state.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}

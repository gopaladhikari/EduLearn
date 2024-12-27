import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { verifyEmailMutation } from "@/lib/mutations/auth.mutation";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/(auth)/_layout/verify-email")({
  component: RouteComponent,
});

type Search = {
  token: string;
};

function RouteComponent() {
  const search = Route.useSearch() as Search;
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: ({ value: { email } }) => {
      return mutatation.mutate(email);
    },
  });

  const mutatation = useMutation({
    mutationFn: (email: string) =>
      verifyEmailMutation(email, search.token),
    onSuccess() {
      navigate({
        to: "/login",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Create New Account</CardTitle>
        <CardDescription>
          Enter your email and password to sign up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3" method="POST">
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
                  await new Promise((resolve) =>
                    setTimeout(resolve, 1000)
                  );
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
          {mutatation.error && (
            <div className="text-destructive">
              {mutatation.error.message}
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          className="w-full"
          onClick={form.handleSubmit}
        >
          {form.state.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}

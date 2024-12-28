import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
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
import { registerMutation } from "@/lib/mutations/auth.mutation";
import { useSeo } from "@/hooks/useSeo";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/_auth/_layout/register")({
  component: RouteComponent,
  async beforeLoad({ context }) {
    if (context.isLoggedIn)
      throw redirect({
        to: "/dashboard",
      });
  },
});

function RouteComponent() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useSeo({
    title: "Register",
    description: "Register to your account",
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      return mutatation.mutate(value);
    },
  });

  const mutatation = useMutation({
    mutationFn: registerMutation,
    onSuccess() {
      form.reset();
    },
  });

  if (isLoggedIn) navigate({ to: "/dashboard" });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Create New Account</CardTitle>
        <CardDescription>
          Enter your email and password to sign up.
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
          <div className="space-y-3">
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Full name is required"
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
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      placeholder="Enter your password"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="text-end">
            <Link to="/login" className="text-sm hover:underline">
              Login?
            </Link>
          </div>
          {mutatation.error && (
            <div className="text-destructive">{mutatation.error.message}</div>
          )}
          {mutatation.isSuccess && (
            <div className="text-green-600">{mutatation.data.message}</div>
          )}
        </form>
      </CardContent>

      <CardFooter>
        <Button type="button" className="w-full" onClick={form.handleSubmit}>
          {form.state.isSubmitting ? "Sign Uping..." : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}

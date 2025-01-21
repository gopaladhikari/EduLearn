import {
  createFileRoute,
  Link,
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
import { useSeo } from "@/hooks/useSeo";
import { loginMutation } from "@/lib/mutations/auth.mutation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { SessionStorage } from "@/config/constants";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();

  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess() {
      setIsLoggedIn(true);
      sessionStorage.setItem(SessionStorage.IS_LOGGED_IN, "true");
      navigate({ to: "/dashboard" });
    },
    onError() {
      setIsLoggedIn(false);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });

  useSeo({
    title: "Login",
    description: "Login to your account",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login.
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
                  await new Promise((resolve) =>
                    setTimeout(resolve, 1000),
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
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
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
                  await new Promise((resolve) =>
                    setTimeout(resolve, 1000),
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
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      eye
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      placeholder="Enter your password"
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="text-end">
            <Link
              to="/forgot-password"
              className="text-sm hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          {mutation.error && (
            <p className="text-destructive">
              {mutation.error.message}
            </p>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button
          type="button"
          className="w-full"
          onClick={form.handleSubmit}
        >
          {form.state.isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
        <Button
          type="button"
          className="w-full"
          variant="secondary"
          onClick={() => {
            form.setFieldValue("email", "admin@edulearn.com");
            form.setFieldValue("password", "Admin@123");
          }}
        >
          Guest User
        </Button>
      </CardFooter>
    </Card>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { confirmForgotPassword } from "@/lib/mutations/auth.mutation";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  confirmPasswordSchema,
  ConfirmPasswordSchema,
} from "@/schemas/confirm-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const mutation = useMutation({
    mutationFn: (formData: ConfirmPasswordSchema) =>
      confirmForgotPassword(formData, token),
    onSuccess() {
      navigate({
        to: "/login",
      });
    },
  });

  const { register, handleSubmit, formState } =
    useForm<ConfirmPasswordSchema>({
      resolver: zodResolver(confirmPasswordSchema),
    });

  const onSubmit: SubmitHandler<ConfirmPasswordSchema> = async (
    data,
  ) => {
    mutation.mutate(data);
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
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              placeholder="Enter your email"
            />
            {formState.errors.email && (
              <p className="text-destructive">
                {formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />

            {formState.errors.password && (
              <p className="text-destructive">
                {formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="Enter your confirm password"
            />
            {formState.errors.confirmPassword && (
              <p className="text-destructive">
                {formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {mutation.isError && (
            <p className="text-destructive">
              {mutation.error.message}
            </p>
          )}
          {mutation.isSuccess && (
            <p className="text-green-600">{mutation.data.message}</p>
          )}

          <Button type="submit" className="w-full">
            {formState.isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

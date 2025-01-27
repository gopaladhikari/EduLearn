import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerMutation } from "@/lib/mutations/auth.mutation";
import { useSeo } from "@/hooks/useSeo";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth.schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  useSeo({
    title: "Register",
    description: "Register to your account",
  });
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending, isError, isSuccess, data, error } =
    useMutation({
      mutationFn: registerMutation,
      onSuccess() {
        form.reset({
          fullName: "",
          email: "",
          password: "",
        });
      },
    });

  const onSubmit: SubmitHandler<RegisterSchema> = async (values) => {
    mutate(values);
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Gopal Adhikari" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gopal@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      eye
                    />
                  </FormControl>
                  <FormDescription>
                    This is your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && (
              <div className="text-destructive">{error.message}</div>
            )}
            {isSuccess && (
              <div className="text-green-600">{data.message}</div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? "Submitting..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

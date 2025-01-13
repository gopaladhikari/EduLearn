"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import {
  loginSchema,
  registerSchema,
  type LoginSchema,
  type RegisterSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">
          Log in to your account
        </CardTitle>
        <CardDescription>
          Enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
                    <div className="flex items-center gap-2 rounded-md border border-input focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="border-none focus:ring-0 focus-visible:ring-0"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeClosed
                            size={16}
                            className="mr-2 text-muted-foreground"
                          />
                        ) : (
                          <Eye
                            size={16}
                            className="mr-2 text-muted-foreground"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {mutation.isError && (
          <div className="text-destructive">
            {(mutation.error as Error).message ||
              "Something went wrong"}
          </div>
        )}
        {mutation.isSuccess && (
          <div className="text-green-600">
            {mutation.data.data?.message}
          </div>
        )} */}
            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting
                  ? "Logining..."
                  : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

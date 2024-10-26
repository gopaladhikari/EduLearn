import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { MaxWithWrapper } from "~/components/partials/MaxWithWrapper";
import {
	Form,
	json,
	Link,
	redirect,
	useActionData,
} from "@remix-run/react";
import { Icons } from "~/components/partials/Icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { loginSchema, LoginAdmin } from "~/schemas/admin.schema";
import { axiosInstance } from "~/config/axios";
import type { CustomizedApiError } from "~/types";
import { commitSession } from "~/lib/session";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Login | E learning",
		},
	];
};

export const action: ActionFunction = async ({ request }) => {
	const { errors, data } = await getValidatedFormData<LoginAdmin>(
		request,
		zodResolver(loginSchema)
	);

	if (errors)
		return json(
			{
				message: "Invalid data",
				errors,
			},
			{ status: 400 }
		);

	try {
		const res = await axiosInstance.post("/login", data);

		if (res.data.success) {
			return redirect("/dashboard", {
				headers: {
					"Set-Cookie": await commitSession(res.data.data),
				},
			});
		}
	} catch (error) {
		console.log(error);
		const err = error as CustomizedApiError;
		return json(
			{
				message: err.response?.data?.message || err.message,
			},
			{ status: 400 }
		);
	}
};

export default function login() {
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		register,
	} = useRemixForm<LoginAdmin>({
		mode: "onSubmit",
		resolver: zodResolver(loginSchema),
	});

	const data = useActionData<typeof action>();
	return (
		<MaxWithWrapper as="section">
			<div className="flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6"
						>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
						E-Learning
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Sign in to your account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email below to sign in
							</p>
						</div>
						<div className="grid gap-6">
							<Form onSubmit={handleSubmit} method="POST">
								<div className="grid gap-2 space-y-3">
									<div className="grid gap-1 space-y-2">
										<Label className="sr-only" htmlFor="phonenumber">
											Email
										</Label>
										<Input
											id="phonenumber"
											placeholder="Phone number"
											type="text"
											autoCapitalize="none"
											autoCorrect="off"
											inputMode="numeric"
											{...register("phoneNumber")}
											disabled={isSubmitting}
										/>
										{errors?.phoneNumber && (
											<p className="text-sm text-destructive">
												{errors.phoneNumber.message}
											</p>
										)}
									</div>

									{data?.message && (
										<p className="text-sm text-destructive">
											{data.message}
										</p>
									)}

									<Button disabled={isSubmitting}>
										{isSubmitting && (
											<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
										)}
										Sign in
									</Button>
								</div>
							</Form>
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>
							<Button
								variant="outline"
								type="button"
								disabled={isSubmitting}
							>
								<Icons.gitHub className="mr-2 h-4 w-4" />
								GitHub
							</Button>
						</div>
						<p className="px-8 text-center text-sm text-muted-foreground">
							By clicking continue, you agree to our{" "}
							<Link
								to="/terms"
								className="underline underline-offset-4 hover:text-primary"
							>
								Terms of Service
							</Link>
							and{" "}
							<Link
								to="/privacy"
								className="underline underline-offset-4 hover:text-primary"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</MaxWithWrapper>
	);
}

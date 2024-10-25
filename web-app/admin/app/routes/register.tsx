import { MaxWithWrapper } from "~/components/partials/MaxWithWrapper";
import { json, Link, redirect } from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { LoginForm } from "~/components/auth/RegisterForm";
import { getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "~/schemas/admin.schema";
import { axiosInstance } from "~/config/axios";
import { AxiosError } from "axios";

const resolver = zodResolver(registerSchema);

export const meta: MetaFunction = () => {
	return [
		{
			title: "Register | E learning",
		},
	];
};

export const action: ActionFunction = async ({ request }) => {
	const { errors, data } = await getValidatedFormData<FormData>(
		request,
		resolver
	);

	if (errors) return json(errors, 400);

	try {
		const res = await axiosInstance.post("/register", data);
		if (res.data.success) return redirect("/login");
		return json(
			{
				success: false,
				message: "Something went wrong",
			},
			{
				status: 400,
			}
		);
	} catch (error) {
		if (error instanceof AxiosError)
			return json(
				error.response?.data,
				error.response?.status || 400
			);
		return json(error, 400);
	}
};

export default function register() {
	return (
		<MaxWithWrapper as="section">
			<div className="flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<div className="absolute inset-0 bg-zinc-900" />
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
								Create an account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email below to create your account
							</p>
						</div>
						<LoginForm />
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

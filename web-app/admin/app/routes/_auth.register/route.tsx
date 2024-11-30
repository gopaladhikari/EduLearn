import { json, redirect } from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { registerSchema } from "~/schemas/admin.schema";
import { axiosInstance } from "~/config/axios";
import type { CustomizedApiError } from "~/types";

import { Icons } from "~/components/partials/Icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RegisterAdmin } from "~/schemas/admin.schema";
import { useRemixForm } from "remix-hook-form";
import { Form, useActionData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";

const resolver = zodResolver(registerSchema);

export const meta: MetaFunction = () => {
	return [
		{
			title: "Register | E learning",
		},
	];
};

type Res = {
	fullName: "Gopal Adhikarii";
	email: "gopal@gmail.com";
	phoneNumber: "9810545494";
	_id: "671c7d1a4ea6a107a9daddc3";
	createdAt: "2024-10-26T05:24:43.005Z";
	updatedAt: "2024-10-26T05:24:43.005Z";
	__v: 0;
};

export const action: ActionFunction = async ({ request }) => {
	const { errors, data } = await getValidatedFormData<FormData>(
		request,
		resolver
	);

	if (errors) return json(errors, 400);

	try {
		const res = await axiosInstance.post<Res>("/register", data);

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
		const err = error as CustomizedApiError;

		return json(
			{
				success: false,
				message: err.response?.data?.message || err.message,
			},
			{
				status: 400,
			}
		);
	}
};

export default function register() {
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		register,
	} = useRemixForm<RegisterAdmin>({
		mode: "onSubmit",
		resolver: zodResolver(registerSchema),
	});

	const data = useActionData<typeof action>();
	return (
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
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="fullName">
							Full Name
						</Label>
						<Input
							id="fullName"
							placeholder="John Doe"
							type="text"
							autoCapitalize="none"
							autoComplete="fullName"
							autoCorrect="off"
							{...register("fullName")}
							disabled={isSubmitting}
						/>

						{errors?.fullName && (
							<p className="text-sm text-destructive">
								{errors.fullName.message}
							</p>
						)}
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							{...register("email")}
							disabled={isSubmitting}
						/>
						{errors?.email && (
							<p className="text-sm text-destructive">
								{errors.email.message}
							</p>
						)}
					</div>

					{data?.message && (
						<p className="text-sm text-destructive">{data.message}</p>
					)}

					<Button disabled={isSubmitting}>
						{isSubmitting && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign up
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
			<Button variant="outline" type="button" disabled={isSubmitting}>
				<Icons.gitHub className="mr-2 h-4 w-4" />
				GitHub
			</Button>
		</div>
	);
}

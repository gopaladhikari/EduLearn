import type { ActionFunction, MetaFunction } from "@remix-run/node";
import {
	Form,
	json,
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
import {
	commitSession,
	destroySession,
	getSession,
} from "~/lib/session";
import type { User } from "~/types/custom";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Login | E learning",
		},
	];
};

type LoginResponse = {
	admin: User;
	jwtToken: string;
};

export const action: ActionFunction = async ({ request }) => {
	const cookie = request.headers.get("cookie");

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

	const session = await getSession(cookie);

	try {
		const res = await axiosInstance.post<LoginResponse>(
			"/login",
			data
		);

		if (res.data.success) {
			const { admin, jwtToken } = res.data.data;

			session.set("user", admin);
			session.set("jwtToken", jwtToken as string);

			return redirect("/dashboard", {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
		return json(
			{
				message: "Something went wrong",
			},
			{
				status: 400,
				headers: {
					"Set-Cookie": await destroySession(session),
				},
			}
		);
	} catch (error) {
		const err = error as CustomizedApiError;

		return json(
			{
				message: err.response?.data?.message || err.message,
			},
			{
				status: 400,
				headers: {
					"Set-Cookie": await destroySession(session),
				},
			}
		);
	}
};

export default function login() {
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		register,
	} = useRemixForm<LoginAdmin>({
		mode: "onSubmit",
		resolver: zodResolver(loginSchema),
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

					{data?.message && (
						<p className="text-sm text-destructive">{data.message}</p>
					)}

					<Button disabled={isSubmitting}>
						{isSubmitting && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign in
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => setValue("phoneNumber", "0123456789")}
					>
						Guest user
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

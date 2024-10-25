import { Icons } from "~/components/partials/Icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	registerSchema,
	RegisterAdmin,
} from "~/schemas/admin.schema";
import { useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useActionData } from "@remix-run/react";
import { action } from "~/routes/register";
import { useEffect } from "react";

export function LoginForm() {
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		register,
		setError,
	} = useRemixForm<RegisterAdmin>({
		mode: "onSubmit",
		resolver: zodResolver(registerSchema),
	});

	const data = useActionData<typeof action>();

	useEffect(() => {
		if (data && data.success === false) {
			setError("root", {
				message: data.message,
			});
		}
	}, [data]);

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
					{errors?.root && (
						<p className="text-sm text-destructive">
							{errors.root.message}
						</p>
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

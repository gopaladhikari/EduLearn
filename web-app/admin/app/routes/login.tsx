import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { MaxWithWrapper } from "~/components/partials/MaxWithWrapper";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Login | E learning",
		},
	];
};

export default function login() {
	return (
		<section>
			<MaxWithWrapper>
				<section className="max-w-screen-sm space-y-3">
					<Form>
						<h2 className="text-3xl font-bold md:text-4xl">
							Hey, Welcome Back!
						</h2>
					</Form>
				</section>
			</MaxWithWrapper>
		</section>
	);
}

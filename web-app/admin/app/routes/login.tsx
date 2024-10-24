import type { ActionFunction, MetaFunction } from "@remix-run/node";

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
			<h1>Hello world</h1>
		</section>
	);
}

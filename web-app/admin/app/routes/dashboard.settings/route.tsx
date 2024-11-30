import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Settings | E learning" },
		{ name: "description", content: "Settings of E-learning" },
	];
};

export default function setting() {
	return (
		<main>
			<h1 className="">Hi world</h1>
			<h1 className="">Hi world</h1>
			<h1 className="">Hi world</h1>
			<h1 className="">Hi world</h1>

			<Outlet />
		</main>
	);
}

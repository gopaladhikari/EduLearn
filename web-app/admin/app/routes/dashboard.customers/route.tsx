import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Customer | E learning" },
		{ name: "description", content: "Customer list of E-learning" },
	];
};

export default function route() {
	return (
		<main>
			<h1 className="text-xl">Customers</h1>
		</main>
	);
}

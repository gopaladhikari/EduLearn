import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Products | E learning" },
		{ name: "description", content: "Products list of E-learning" },
	];
};

export default function route() {
	return <div>route</div>;
}

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Settings | E learning" },
		{ name: "description", content: "Settings of E-learning" },
	];
};

export default function setting() {
	return <div>setting</div>;
}

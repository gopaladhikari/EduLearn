import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { MaxWithWrapper } from "~/components/partials/MaxWithWrapper";

export const meta: MetaFunction = () => {
	return [
		{ title: "Admin | E learning" },
		{ name: "description", content: "Welcome to E-learning" },
	];
};

export interface LoaderData {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export const loader = async () => {
	const res = await fetch(
		"https://jsonplaceholder.typicode.com/posts"
	);
	const data: LoaderData[] = await res.json();

	return json(
		{ data },
		{
			headers: {
				"Cache-Control": "max-age=3600, public",
			},
		}
	);
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return <MaxWithWrapper className="space-y-5"></MaxWithWrapper>;
}

import type { LoaderFunction } from "@remix-run/node";
import { json, useActionData, useLoaderData } from "@remix-run/react";
import { MaxWithWrapper } from "~/components/partials/MaxWithWrapper";
import { Button } from "~/components/ui/button";

export const loader: LoaderFunction = async ({ params }) => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${params.blogId}`
	);
	const data = await res.json();

	return json(
		{ data },
		{
			headers: {
				"Cache-Control": "max-age=3600, public",
			},
		}
	);
};

export default function page() {
	const data = useLoaderData<typeof loader>();

	if (!data) return null;

	return <MaxWithWrapper>{JSON.stringify(data)}</MaxWithWrapper>;
}

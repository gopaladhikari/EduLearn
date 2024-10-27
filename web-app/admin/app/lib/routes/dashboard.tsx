// import { json, type LoaderFunction } from "@remix-run/node";
// import { getCurrentUser } from "~/lib/session";

// export const loader: LoaderFunction = async ({ request }) => {
// 	await getCurrentUser(request);

// 	return json(
// 		{},
// 		{
// 			status: 200,
// 		}
// 	);
// };

export default function dashboard() {
	return <div>dashboard</div>;
}

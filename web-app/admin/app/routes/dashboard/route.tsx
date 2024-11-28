import type { LoaderFunction } from "@remix-run/node";
import {
	json,
	Outlet,
	redirect,
	useLoaderData,
} from "@remix-run/react";
import { Search } from "lucide-react";
import { MainNav } from "~/components/dashboard/main-nav";
import { UserNav } from "~/components/dashboard/user-nav";
import { MaxWithWrapper } from "~/components/partials/MaxWithWrapper";
import { ModeToggle } from "~/components/partials/mode-toggle";
import { destroySession, getSession } from "~/lib/session";

export const loader: LoaderFunction = async ({ request }) => {
	const cookie = request.headers.get("cookie");

	const session = await getSession(cookie);

	if (session.has("user")) return json(session.get("user"));
	return redirect("/", {
		status: 401,
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};

export default function dashboard() {
	const data = useLoaderData<typeof loader>();

	return (
		<>
			<MaxWithWrapper className="p-0">
				<div className="border-b">
					<div className="flex h-16 items-center px-4">
						<strong className="text-lg">E-learning</strong>
						<MainNav className="mx-6" />
						<div className="ml-auto flex items-center space-x-4">
							<Search />
							<ModeToggle />
							<UserNav user={data} />
						</div>
					</div>
				</div>

				<Outlet />
			</MaxWithWrapper>
		</>
	);
}

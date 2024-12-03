import type { LoaderFunction } from "@remix-run/node";
import {
	json,
	Link,
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
			<div className="border-b shadow-md">
				<MaxWithWrapper className="flex items-center gap-4">
					<strong className="text-2xl">
						<Link to="/dashboard" className="text-foreground">
							E-learning
						</Link>
					</strong>
					<header>
						<MainNav className="mx-6" />
					</header>
					<div className="ml-auto flex items-center space-x-4">
						<Search />
						<ModeToggle />
						<UserNav user={data} />
					</div>
				</MaxWithWrapper>
			</div>
			<MaxWithWrapper>
				<Outlet />
			</MaxWithWrapper>
		</>
	);
}

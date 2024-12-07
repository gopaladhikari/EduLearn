import type { LoaderFunction, SessionData } from "@remix-run/node";
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
import { axiosInstance } from "~/config/axios";
import {
	commitSession,
	destroySession,
	getSession,
} from "~/lib/session";

export const loader: LoaderFunction = async ({ request }) => {
	const cookie = request.headers.get("cookie");

	const session = await getSession(cookie);

	if (!session.has("jwtToken"))
		return redirect("/", {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});

	const jwtToken = session.get("jwtToken");

	axiosInstance.defaults.headers.common["Authorization"] =
		`Bearer ${jwtToken}`;

	const lastSessionUpdate = session.get("lastSessionUpdate") || 0;

	const currentTime = Date.now();

	const updateInterval = 1000 * 60 * 60 * 24;

	const shouldUpdateSession =
		currentTime - lastSessionUpdate > updateInterval;

	try {
		if (shouldUpdateSession) {
			const { data } = await axiosInstance.get("/update-session");

			if (!data.success) {
				return redirect("/", {
					headers: {
						"Set-Cookie": await destroySession(session),
					},
				});
			}

			session.set("lastSessionUpdate", currentTime);
			session.set("user", data.data.admin);
			session.set("jwtToken", data.data.jwtToken);

			return json(data.data.admin, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}

		return json(session.get("user"), {
			headers: {
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		return redirect("/", {
			headers: {
				"Set-Cookie": await destroySession(session),
			},
		});
	}
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
						<UserNav data={data} />
					</div>
				</MaxWithWrapper>
			</div>
			<MaxWithWrapper>
				<Outlet />
			</MaxWithWrapper>
		</>
	);
}

import type { LoaderFunction, SessionData } from "@remix-run/node";
import {
	json,
	Link,
	Outlet,
	redirect,
	useLoaderData,
} from "@remix-run/react";
import type { AxiosError } from "axios";
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
import type { CustomizedApiError } from "~/types";

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

	try {
		const { data } = await axiosInstance.get("/update-session");

		if (!data.success)
			return redirect("/", {
				headers: {
					"Set-Cookie": await destroySession(session),
				},
			});

		return json(data.data, {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	} catch (error) {
		console.log((error as CustomizedApiError).response?.data);
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

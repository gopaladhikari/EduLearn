import { Outlet } from "@remix-run/react";
import { Search } from "lucide-react";
import { MainNav } from "~/components/dashboard/main-nav";
import TeamSwitcher from "~/components/dashboard/team-switcher";
import { UserNav } from "~/components/dashboard/user-nav";

export default function dashboard() {
	return (
		<>
			<div className="md:hidden">
				<img
					src="/examples/dashboard-light.png"
					width={1280}
					height={866}
					alt="Dashboard"
					className="block dark:hidden"
				/>
				<img
					src="/examples/dashboard-dark.png"
					width={1280}
					height={866}
					alt="Dashboard"
					className="hidden dark:block"
				/>
			</div>

			<div className="border-b">
				<div className="flex h-16 items-center px-4">
					<TeamSwitcher />
					<MainNav className="mx-6" />
					<div className="ml-auto flex items-center space-x-4">
						<Search />
						<UserNav />
					</div>
				</div>
			</div>

			<Outlet />
		</>
	);
}

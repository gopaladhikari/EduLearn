import { Outlet } from "@remix-run/react";
import { AppSidebar } from "~/components/settings/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function setting() {
	return (
		<SidebarProvider>
			<main className="w-full">
				<h1 className="py-6">Settings</h1>
				<div className="grid grid-cols-12 gap-6">
					<aside className="col-span-2">
						<AppSidebar />
					</aside>
					<div className="col-span-10">
						<Outlet />
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
}

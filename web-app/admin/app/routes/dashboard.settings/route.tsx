import { AppSidebar } from "~/components/settings/app-sidebar";
import {
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";

export default function setting() {
	return (
		<SidebarProvider>
			<main>
				<h1>Settings</h1>
				<AppSidebar />
			</main>
		</SidebarProvider>
	);
}

import { menu } from "~/config/site";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { cn } from "~/lib/utils";

export function AppSidebar() {
	const { pathname } = useLocation();

	return (
		<Sidebar collapsible="none" className="w-full bg-transparent">
			<SidebarContent>
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu>
							{menu.settings.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton
										asChild
										className={cn(
											pathname === item.to && "bg-sidebar-accent"
										)}
									>
										<Link to={item.to}>{item.name}</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

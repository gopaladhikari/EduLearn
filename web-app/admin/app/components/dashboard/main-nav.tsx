import { NavLink, useLocation } from "@remix-run/react";
import { menu } from "~/config/site";
import { cn } from "~/lib/utils";

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const { pathname } = useLocation();

	return (
		<nav className={className} {...props}>
			<menu className="flex items-center space-x-4 lg:space-x-6">
				{menu.dashboard.map((item) => {
					const isActive =
						pathname === item.to ||
						(item.to !== "/dashboard" &&
							pathname.startsWith(`${item.to}/`));

					return (
						<li key={item.name}>
							<NavLink
								to={item.to}
								className={() =>
									cn(
										"text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
										isActive && "text-primary"
									)
								}
							>
								{item.name}
							</NavLink>
						</li>
					);
				})}
			</menu>
		</nav>
	);
}

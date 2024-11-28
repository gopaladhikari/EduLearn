import { NavLink } from "@remix-run/react";
import { menu } from "~/config/site";
import { cn } from "~/lib/utils";

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<nav className={className} {...props}>
			<menu className="flex items-center space-x-4 lg:space-x-6">
				{menu.dashboard.map((item) => (
					<li key={item.name}>
						<NavLink
							relative="path"
							to={item.to}
							end
							className={({ isActive }) =>
								cn(
									"text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
									isActive && "text-primary"
								)
							}
						>
							{item.name}
						</NavLink>
					</li>
				))}
			</menu>
		</nav>
	);
}

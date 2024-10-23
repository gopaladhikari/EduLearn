import { menu } from "~/config/site";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/cn";

export function Header() {
	return (
		<header className="bg-background">
			<MaxWithWrapper>
				<nav>
					<menu className="flex items-center gap-6">
						<li className="mr-auto text-2xl font-bold">
							<NavLink to="/">E-learning</NavLink>
						</li>
						{menu.main.map((item) => (
							<li key={item.name}>
								<NavLink
									to={item.to}
									className={({ isActive }) =>
										cn("text-sm", isActive && "text-blue-400")
									}
								>
									{item.name}
								</NavLink>
							</li>
						))}
					</menu>
				</nav>
			</MaxWithWrapper>
		</header>
	);
}

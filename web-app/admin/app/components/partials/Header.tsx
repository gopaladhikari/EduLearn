import { menu } from "~/config/site";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { json, NavLink, useLoaderData } from "@remix-run/react";
import { cn } from "~/lib/utils";
import type { User } from "~/types/custom";

export function Header() {
	const user = useLoaderData();

	return (
		<header className="shadow-md dark:border-b dark:shadow-none">
			<MaxWithWrapper as="section">
				<nav role="navigation">
					<menu className="flex items-center gap-6" role="menu">
						<li
							className="mr-auto text-2xl font-bold text-primary"
							role="menubar"
						>
							<NavLink to="/" role="menuitem">
								E-learning
							</NavLink>
						</li>
						{menu.main.map((item) => (
							<li key={item.name} role="menubar">
								<NavLink
									to={item.to}
									role="menuitem"
									className={({ isActive }) =>
										cn("text-sm", isActive && "text-primary")
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

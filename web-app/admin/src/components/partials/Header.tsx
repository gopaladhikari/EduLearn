import { Link, useLocation } from "@tanstack/react-router";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { menu } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const { pathname } = useLocation();
  return (
    <header className="shadow-md dark:border-b dark:shadow-none">
      <MaxWithWrapper as="section">
        <nav role="navigation">
          <menu className="flex items-center gap-6" role="menu">
            <li
              className="mr-auto text-2xl font-bold text-primary"
              role="menubar"
            >
              <Link to="/" role="menuitem">
                E-learning
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
            {menu.main.map((item) => (
              <li
                key={item.name}
                role="menubar"
                className={cn(pathname === item.to && "text-primary")}
              >
                <Link to={item.to} role="menuitem">
                  {item.name}
                </Link>
              </li>
            ))}
          </menu>
        </nav>
      </MaxWithWrapper>
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { menu } from "@/config/site";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="shadow-md dark:border-b dark:shadow-none">
      <MaxWithWrapper as="section">
        <nav role="navigation">
          <menu className="flex items-center gap-6" role="menu">
            <li
              className="mr-auto text-2xl font-bold text-primary"
              role="menubar"
            >
              <Logo />
            </li>
            <li>
              <ModeToggle />
            </li>
            {menu.main.map((item) => (
              <li key={item.name} role="menubar">
                <Link
                  to={item.to}
                  role="menuitem"
                  activeProps={{ className: "text-primary" }}
                >
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

import { Link } from "@tanstack/react-router";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { menu } from "@/config/site";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { UserNav } from "../dashboard/user-nav";
import { useMe } from "@/store/user-store";

function AuthNav() {
  return (
    <>
      {menu.auth.map((item) => (
        <li key={item.name} role="menubar">
          <Link
            to={item.to}
            role="menuitem"
            activeProps={{ className: "text-primary" }}
            className="text-sm"
          >
            {item.name}
          </Link>
        </li>
      ))}
      <li className="ml-auto">
        <ModeToggle />
      </li>
      <li>
        <UserNav />
      </li>
    </>
  );
}

function MainNav() {
  return (
    <>
      <li className="ml-auto">
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
    </>
  );
}

export function Header() {
  const user = useMe();

  return (
    <header
      className={cn(
        user && "bg-background sticky inset-0 z-10000",
        "border-secondary shadow-lg dark:border-b dark:shadow-none",
      )}
    >
      <MaxWithWrapper as="section">
        <nav role="navigation">
          <menu className="flex items-center gap-6" role="menu">
            <li role="menubar">
              <Logo />
            </li>
            {user ? <AuthNav /> : <MainNav />}
          </menu>
        </nav>
      </MaxWithWrapper>
    </header>
  );
}

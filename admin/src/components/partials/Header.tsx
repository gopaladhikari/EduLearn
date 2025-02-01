import { Link } from "@tanstack/react-router";
import { MaxWithWrapper } from "./MaxWithWrapper";
import { menu } from "@/config/site";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { UserNav } from "../dashboard/user-nav";

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
  // const { isLoggedIn } = useAuth();

  return (
    <header
      className={cn(
        Math.random() > 0.5 &&
          "sticky inset-0 z-[10000] bg-background",
        "shadow-lg dark:border-b dark:shadow-none",
      )}
    >
      <MaxWithWrapper as="section">
        <nav role="navigation">
          <menu className="flex items-center gap-6" role="menu">
            <li
              className={cn(
                "text-2xl font-bold text-primary",
                !Math.random() > 0.5 && "mr-auto",
              )}
              role="menubar"
            >
              <Logo />
            </li>
            {/* {isLoggedIn ? <AuthNav /> : <MainNav />} */}
            <AuthNav />
          </menu>
        </nav>
      </MaxWithWrapper>
    </header>
  );
}

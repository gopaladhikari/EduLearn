import { useLocation } from "react-router";

import { useUserStore } from "~/store/userStore";
import { Logo } from "../logo";
import { Skeleton } from "../ui/skeleton";
import { UserNav } from "./user-nav";
import { AuthNav } from "./auth-nav";

export function Header() {
  const location = useLocation();

  const redirectTo = location.pathname + location.search + location.hash;

  const isAuthChecked = useUserStore((state) => state.isAuthChecked);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Logo />

        {!isAuthChecked ? (
          <div className="flex w-44 flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ) : isAuthenticated ? (
          <UserNav />
        ) : (
          <AuthNav redirectTo={redirectTo} />
        )}
      </nav>
    </header>
  );
}

import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { Logo } from "@/components/partials/Logo";
import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { ModeToggle } from "@/components/partials/mode-toggle";
import { NotFound } from "@/components/partials/NotFound";
import { Loading } from "@/components/skeletons/Spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  createFileRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  notFoundComponent: NotFound,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { isLoggedIn, isPending } = useAuth();

  useEffect(() => {
    if (!isPending) {
      if (!isLoggedIn) navigate({ to: "/login" });
    }
  }, [isLoggedIn, isPending, navigate]);

  return (
    <>
      <div className="border-b shadow-md">
        <MaxWithWrapper className="flex items-center gap-4">
          <Logo href="/dashboard" />
          <header>
            <MainNav className="mx-6" />
          </header>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </MaxWithWrapper>
      </div>
      <main>
        {isPending ? (
          <Loading />
        ) : (
          <MaxWithWrapper className="h-full space-y-3">
            <Outlet />
          </MaxWithWrapper>
        )}
      </main>
    </>
  );
}

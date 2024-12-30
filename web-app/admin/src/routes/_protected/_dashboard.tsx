import { MainNav } from "@/components/dashboard/main-nav";
import Search from "@/components/dashboard/search";
import UserNav from "@/components/dashboard/user-nav";
import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { ModeToggle } from "@/components/partials/mode-toggle";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="border-b shadow-md">
        <MaxWithWrapper className="flex items-center gap-4">
          <strong className="text-2xl">
            <Link to="/dashboard" className="text-foreground">
              E-learning
            </Link>
          </strong>
          <header>
            <MainNav className="mx-6" />
          </header>
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ModeToggle />
            <UserNav />
          </div>
        </MaxWithWrapper>
      </div>
      <main>
        <MaxWithWrapper className="space-y-2">
          <Outlet />
        </MaxWithWrapper>
      </main>
    </>
  );
}

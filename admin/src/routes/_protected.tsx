import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { NotFound } from "@/components/partials/NotFound";
import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  pendingComponent: () => {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-lg">
            Please wait while we load the page.
          </p>
        </div>
      </div>
    );
  },
  notFoundComponent: NotFound,
  beforeLoad({ context, location }) {
    if (!context.isLoggedIn) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <MaxWithWrapper className="h-full space-y-3">
      <Outlet />
    </MaxWithWrapper>
  );
}

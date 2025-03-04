import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { NotFound } from "@/components/partials/NotFound";
import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
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

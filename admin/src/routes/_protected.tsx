import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { NotFound } from "@/components/partials/NotFound";
import { Loading } from "@/components/skeletons/Spinner";
import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  notFoundComponent: NotFound,
  beforeLoad({ context }) {
    if (!context.isLoggedIn)
      throw redirect({
        to: "/login",
      });
  },
  pendingComponent: Loading,
});

function RouteComponent() {
  return (
    <MaxWithWrapper className="h-full space-y-3">
      <Outlet />
    </MaxWithWrapper>
  );
}

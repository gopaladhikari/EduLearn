import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MaxWithWrapper className="h-full space-y-3">
      <Outlet />
    </MaxWithWrapper>
  );
}

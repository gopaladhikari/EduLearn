import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  async beforeLoad({ context }) {
    if (!context.isLoggedIn)
      throw redirect({
        to: "/login",
      });
  },
});

function RouteComponent() {
  return <Outlet />;
}

import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn) navigate({ to: "/login" });

  return <Outlet />;
}

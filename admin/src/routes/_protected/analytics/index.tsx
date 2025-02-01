import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/analytics/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/analytics/"!</div>;
}

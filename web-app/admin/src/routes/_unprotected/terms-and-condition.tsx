import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_unprotected/terms-and-condition")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_unprotected/terms"!</div>;
}

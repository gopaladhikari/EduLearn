import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_unprotected/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_unprotected/privacy-policy"!</div>;
}

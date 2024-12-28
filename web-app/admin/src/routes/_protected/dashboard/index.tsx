import { useSeo } from "@/hooks/useSeo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  useSeo({
    title: "Dashboard",
    description: "Dashboard to manage your account",
  });
  return <div>dashboard!</div>;
}

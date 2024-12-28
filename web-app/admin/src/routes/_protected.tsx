import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  async beforeLoad({ context, location }) {
    if (!context.isLoggedIn)
      redirect({
        to: "/login",
        search: location.href,
      });
  },
});

function RouteComponent() {
  return (
    <>
      <header>Nav</header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

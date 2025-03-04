import { SidebarNav } from "@/components/settings/side-bar";
import { Separator } from "@/components/ui/separator";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="hidden space-y-6 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <div className="lg:w-1/5">
          <aside className="sticky top-24">
            <SidebarNav />
          </aside>
        </div>
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

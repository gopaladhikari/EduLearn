import { DisplayForm } from "@/components/settings/display-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/display")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Display",
        },
        {
          name: "description",
          content: "Display settings of EduLearn platform",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-muted-foreground text-sm">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  );
}

import { NotificationsForm } from "@/components/settings/notification-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/settings/notifications",
)({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Notifications",
        },
        {
          name: "description",
          content: "Notifications settings of EduLearn platform",
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
      <NotificationsForm />
    </div>
  );
}

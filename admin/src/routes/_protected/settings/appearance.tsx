import { AppearanceForm } from "@/components/settings/appearance-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/settings/appearance",
)({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Appearance",
        },
        {
          name: "description",
          content: "Appearance settings of EduLearn platform",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch
          between day and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}

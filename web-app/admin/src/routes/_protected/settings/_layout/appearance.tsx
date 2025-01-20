import { AppearanceForm } from "@/components/settings/appearance-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/settings/_layout/appearance",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch
          between day and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}

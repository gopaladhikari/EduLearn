import { AccountForm } from "@/components/settings/account-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/settings/_layout/account",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language
          and timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}

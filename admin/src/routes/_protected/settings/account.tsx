import { AccountForm } from "@/components/settings/account-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/account")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Account",
        },
        {
          name: "description",
          content: "Account settings of EduLearn platform",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred language
          and timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}

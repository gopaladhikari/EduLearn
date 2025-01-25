import { AvatarForm } from "@/components/settings/AvatarForm";
import ProfileForms from "@/components/settings/profile-form";
import { useSeo } from "@/hooks/useSeo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/_layout/")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  useSeo({
    title: "Settings",
    description: "Settings page of EduLearn",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <AvatarForm />
      <ProfileForms />
    </div>
  );
}

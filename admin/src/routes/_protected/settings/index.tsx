import { AvatarForm } from "@/components/settings/AvatarForm";
import ProfileForms from "@/components/settings/profile-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Setting",
        },
        {
          name: "description",
          content: "General settings of EduLearn platform",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <AvatarForm />
      <ProfileForms />
    </div>
  );
}

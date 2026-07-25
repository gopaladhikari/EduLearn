import { useSubmit } from "react-router";
import { CheckCircle, VolumeX, Clock, Ban } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function ModerationSidebar({
  userId,
  isSubmitting,
}: {
  userId: string;
  isSubmitting: boolean;
}) {
  const submit = useSubmit();

  const handleModeration = (actionType: "mute" | "temp_ban" | "perm_ban") => {
    if (
      confirm(
        `Are you sure you want to ${actionType.replace("_", " ")} this user?`
      )
    ) {
      const formData = new FormData();
      formData.append("intent", "moderate_user");
      formData.append("actionType", actionType);
      formData.append("userId", userId);
      submit(formData, { method: "post" });
    }
  };

  return (
    <Card className="sticky top-8 border-green-500/20 p-6 shadow-md">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold">Instructor Approved</h3>
      </div>
      <hr className="my-6" />
      <h4 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
        Moderation Tools
      </h4>
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start hover:text-orange-600"
          onClick={() => handleModeration("mute")}
          disabled={isSubmitting}
        >
          <VolumeX className="mr-2 h-4 w-4" /> Mute Instructor
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start hover:text-destructive"
          onClick={() => handleModeration("temp_ban")}
          disabled={isSubmitting}
        >
          <Clock className="mr-2 h-4 w-4" /> Temporary Ban (7 Days)
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={() => handleModeration("perm_ban")}
          disabled={isSubmitting}
        >
          <Ban className="mr-2 h-4 w-4" /> Permanently Ban
        </Button>
      </div>
    </Card>
  );
}

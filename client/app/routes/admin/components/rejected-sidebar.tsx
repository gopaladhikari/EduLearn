import { XCircle } from "lucide-react";
import { Card } from "~/components/ui/card";

export function RejectedSidebar({ reason }: { reason?: string }) {
  return (
    <Card className="sticky top-8 border-destructive/20 bg-destructive/5 p-6 shadow-md">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
          <XCircle className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-destructive">
          Application Rejected
        </h3>
      </div>
      <div className="rounded-lg border border-border bg-background p-4">
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
          Rejection Reason
        </p>
        <p className="text-sm whitespace-pre-wrap">
          {reason || "No specific reason provided."}
        </p>
      </div>
    </Card>
  );
}

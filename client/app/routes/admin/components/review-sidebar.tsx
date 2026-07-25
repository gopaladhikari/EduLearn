import { Form, useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewFormValues } from "~/schemas/review.schema";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export function ReviewSidebar({ isSubmitting }: { isSubmitting: boolean }) {
  const submit = useSubmit();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { status: "accepted", rejectionReason: undefined },
  });

  const onSubmit = (data: ReviewFormValues) => {
    submit({ ...data, intent: "review_application" }, { method: "patch" });
  };

  return (
    <Card className="sticky top-8 border-primary/20 p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Review Decision
      </h3>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-4">
          <Field className="space-y-2">
            <FieldLabel className="text-sm font-medium">Decision</FieldLabel>
            <div className="space-y-2">
              <FieldLabel className="flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-accent/50">
                <Input
                  type="radio"
                  value="accepted"
                  {...form.register("status")}
                  className="h-4 w-4"
                />
                <div>
                  <p className="text-sm font-medium">Approve</p>
                  <p className="text-xs text-muted-foreground">
                    Accept this application
                  </p>
                </div>
              </FieldLabel>
              <FieldLabel className="flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-accent/50">
                <Input
                  type="radio"
                  value="rejected"
                  {...form.register("status")}
                  className="h-4 w-4"
                />
                <div>
                  <p className="text-sm font-medium">Reject</p>
                  <p className="text-xs text-muted-foreground">
                    Decline this application
                  </p>
                </div>
              </FieldLabel>
            </div>
          </Field>

          {form.watch("status") === "rejected" && (
            <Field>
              <FieldLabel>Rejection Reason *</FieldLabel>
              <Textarea rows={4} {...form.register("rejectionReason")} />
              {form.formState.errors.rejectionReason && (
                <p className="mt-2 text-sm text-destructive">
                  {form.formState.errors.rejectionReason.message}
                </p>
              )}
            </Field>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Decision"}
          </Button>
        </FieldGroup>
      </Form>
    </Card>
  );
}

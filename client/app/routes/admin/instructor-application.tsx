import {
  Form,
  Link,
  useLoaderData,
  useSubmit,
  type MetaArgs,
} from "react-router";
import type { LoaderFunction } from "react-router";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import type { InstructorApplication } from "../../../types/instructor-application.t";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Award, Briefcase } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewFormValues } from "~/schemas/review.schema";
import { useForm } from "react-hook-form";
import { Textarea } from "~/components/ui/textarea";

interface Result {
  instructorApplication: InstructorApplication;
}

export const clientLoader: LoaderFunction = async ({ params }) => {
  const { applicationId } = params;

  try {
    const { data } = await api.get<Result>(
      `/api/v1/instructor-application/${applicationId}`
    );

    return data;
  } catch (error) {
    return handleActionError(error);
  }
};

export function meta({ loaderData }: MetaArgs) {
  const instructorApplication = (loaderData as ApiSuccess<Result>)?.data
    ?.instructorApplication;

  return [
    {
      title: instructorApplication?.user?.username
        ? `${instructorApplication.user.username} - Instructor Application`
        : "Instructor Application",
    },
    {
      name: "description",
      content: "View and manage individual instructor applications.",
    },
  ];
}

export default function InstructorApplication() {
  const response = useLoaderData<ApiSuccess<Result> | ApiError>();

  const submit = useSubmit();

  if (!response.success) {
    return (
      <div className="mx-auto mt-10 max-w-7xl">
        <Card>
          <CardContent className="py-10 text-center text-destructive">
            {response.message}
          </CardContent>
        </Card>
      </div>
    );
  }

  const application = response.data.instructorApplication;

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      status: "approved",
      rejectionReason: "",
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    submit(data, { method: "post" });
  };

  return (
    <div>
      <Link to="/admin/instructor-applications">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-foreground">
          Review Application
        </h1>
        <p className="text-muted-foreground">
          Review and approve/reject instructor application
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-medium text-foreground">
                  {application.user.username}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${application.user.email}`}
                    className="text-primary hover:underline"
                  >
                    {application.user.email}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Professional Details */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Professional Details
            </h2>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Qualification</p>
                </div>
                <p className="text-foreground">{application.qualification}</p>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Experience</p>
                </div>
                <p className="text-foreground">
                  {application.experienceYears} years
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Expertise Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {application.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Motivation */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Teaching Motivation
            </h2>
            <p className="leading-relaxed text-foreground">
              {application.motivation}
            </p>
          </Card>

          {/* Social Links */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Social Links
            </h2>
            <div className="space-y-3">
              {application.socialLinks.website && (
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <a
                    href={application.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {application.socialLinks.website}
                  </a>
                </div>
              )}
              {application.socialLinks.linkedin && (
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a
                    href={application.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {application.socialLinks.linkedin}
                  </a>
                </div>
              )}
              {application.socialLinks.youtube && (
                <div>
                  <p className="text-sm text-muted-foreground">YouTube</p>
                  <a
                    href={application.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {application.socialLinks.youtube}
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar - Review Form */}
        <div>
          <Card className="sticky top-8 p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Review Decision
            </h3>

            <Form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-4">
                {/* Status Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Decision
                  </label>
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/50">
                      <input
                        type="radio"
                        value="approved"
                        {...form.register("status")}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Approve
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Accept this application
                        </p>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/50">
                      <input
                        type="radio"
                        value="rejected"
                        {...form.register("status")}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Reject
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Decline this application
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Rejection Reason (conditional) */}
                {form.watch("status") === "rejected" && (
                  <Field>
                    <FieldLabel htmlFor="rejection-reason">
                      Rejection Reason *
                    </FieldLabel>
                    <Textarea
                      id="rejection-reason"
                      placeholder="Explain why this application is being rejected..."
                      rows={4}
                      {...form.register("rejectionReason")}
                    />
                    {form.formState.errors.rejectionReason && (
                      <p className="mt-2 text-sm text-destructive">
                        {form.formState.errors.rejectionReason.message}
                      </p>
                    )}
                  </Field>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Decision"}
                </Button>
              </FieldGroup>
            </Form>

            {/* Info */}
            <div className="mt-6 rounded-lg bg-accent/10 p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> This decision will be sent to the
                applicant via email.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

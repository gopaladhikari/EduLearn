import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, CheckCircle } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

import {
  Form,
  useActionData,
  useSubmit,
  type ActionFunction,
} from "react-router";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import {
  instructorApplicationSchema,
  type InstructorApplicationFormValues,
} from "~/schemas/instructor-application.schema";

export function meta() {
  return [
    { title: "Become Instructor - Edulearn" },
    { name: "description", content: "Become an Instructor on Edulearn" },
  ];
}

export const clientAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const stringyFormData = Object.fromEntries(formData);

    const newFormData = {
      ...stringyFormData,
      expertise: (stringyFormData.expertise as string).split(","),
      experienceYears: Number(stringyFormData.experienceYears),
    };

    const result = await api.post(
      "/api/v1/instructor-application",
      newFormData
    );

    return result.data;
  } catch (error) {
    return handleActionError(error);
  }
};

export default function BecomeInstructorPage() {
  const [currentExpertise, setCurrentExpertise] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);

  const actionData = useActionData<ApiError | ApiSuccess>();

  const submit = useSubmit();

  const form = useForm<InstructorApplicationFormValues>({
    resolver: zodResolver(instructorApplicationSchema),
  });

  const addExpertise = () => {
    if (
      currentExpertise.trim() &&
      !expertise.includes(currentExpertise.trim())
    ) {
      const newExpertise = [...expertise, currentExpertise.trim()];
      setExpertise(newExpertise);
      form.setValue("expertise", newExpertise);
      setCurrentExpertise("");
    }
  };

  const removeExpertise = (value: string) => {
    setExpertise(expertise.filter((e) => e !== value));
  };

  const onSubmit = async (data: InstructorApplicationFormValues) => {
    const finalData = { ...data, expertise };

    await submit(finalData, { method: "post" });
  };

  if (actionData?.success === true) {
    return (
      <>
        <section className="bg-linear-to-br from-primary/5 to-accent/5">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              Apply to Teach
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our community of educators and share your knowledge with
              students worldwide.
            </p>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Card className="p-12">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                Application Submitted!
              </h2>
              <p className="mb-8 text-muted-foreground">
                Thank you for applying to become an instructor. We&apos;ll
                review your application and get back to you within 7-10 business
                days.
              </p>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-linear-to-br from-primary/5 to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Apply to Teach
          </h1>
          <p className="text-xl text-muted-foreground">
            Join our community of educators and share your knowledge with
            students worldwide.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="p-8">
            <Form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-8">
                {/* Motivation Field */}
                <Field>
                  <FieldLabel htmlFor="motivation">
                    Why do you want to teach?{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    Tell us about your motivation to share knowledge with
                    students
                  </FieldDescription>
                  <Textarea
                    id="motivation"
                    placeholder="Share your teaching motivation and goals..."
                    rows={4}
                    {...form.register("motivation")}
                    aria-invalid={!!form.formState.errors.motivation}
                  />
                  {form.formState.errors.motivation && (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.motivation.message}
                    </p>
                  )}
                </Field>

                {/* Experience Field */}
                <Field>
                  <FieldLabel htmlFor="experienceYears">
                    Years of Experience{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    How many years of professional experience do you have?
                  </FieldDescription>
                  <Input
                    id="experienceYears"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="30"
                    placeholder="0"
                    {...form.register("experienceYears", {
                      valueAsNumber: true,
                    })}
                    aria-invalid={!!form.formState.errors.experienceYears}
                  />
                  {form.formState.errors.experienceYears && (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.experienceYears.message}
                    </p>
                  )}
                </Field>

                {/* Expertise Field */}
                <Field>
                  <FieldLabel htmlFor="expertise">
                    Areas of Expertise{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    Add multiple areas where you have expertise
                  </FieldDescription>
                  <div className="flex gap-2">
                    <Input
                      id="expertise"
                      placeholder="e.g., Web Development, Python, Machine Learning"
                      value={currentExpertise}
                      onChange={(e) => setCurrentExpertise(e.target.value)}
                      aria-invalid={!!form.formState.errors.expertise}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addExpertise();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addExpertise}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {expertise.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expertise.map((exp) => (
                        <div
                          key={exp}
                          className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                        >
                          {exp}
                          <button
                            type="button"
                            onClick={() => removeExpertise(exp)}
                            className="ml-1 hover:text-primary/80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>

                {/* Qualification Field */}
                <Field>
                  <FieldLabel htmlFor="qualification">
                    Qualification <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    Your educational background or professional certification
                  </FieldDescription>
                  <Textarea
                    id="qualification"
                    placeholder="e.g., Bachelor of Science in Computer Science, AWS Certified Solutions Architect..."
                    rows={3}
                    {...form.register("qualification")}
                    aria-invalid={!!form.formState.errors.qualification}
                  />
                  {form.formState.errors.qualification && (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.qualification.message}
                    </p>
                  )}
                </Field>

                {/* Social Links Section */}
                <div className="border-t pt-8">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Social Links (Optional)
                  </h3>

                  <div className="space-y-6">
                    {/* YouTube URL */}
                    <Field>
                      <FieldLabel htmlFor="youtubeUrl">
                        YouTube Channel
                      </FieldLabel>
                      <Input
                        id="youtubeUrl"
                        type="url"
                        placeholder="https://youtube.com/..."
                        {...form.register("youtube")}
                        aria-invalid={!!form.formState.errors.youtube}
                      />
                      {form.formState.errors.youtube && (
                        <p className="mt-2 text-sm text-destructive">
                          {form.formState.errors.youtube?.message}
                        </p>
                      )}
                    </Field>

                    {/* LinkedIn URL */}
                    <Field>
                      <FieldLabel htmlFor="linkedinUrl">
                        LinkedIn Profile
                      </FieldLabel>
                      <Input
                        id="linkedinUrl"
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        {...form.register("linkedin")}
                        aria-invalid={!!form.formState.errors.linkedin}
                      />
                      {form.formState.errors.linkedin && (
                        <p className="mt-2 text-sm text-destructive">
                          {form.formState.errors.linkedin.message}
                        </p>
                      )}
                    </Field>

                    {/* Website URL */}
                    <Field>
                      <FieldLabel htmlFor="websiteUrl">
                        Personal Website
                      </FieldLabel>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        {...form.register("website")}
                        aria-invalid={!!form.formState.errors.linkedin}
                      />
                      {form.formState.errors.linkedin && (
                        <p className="mt-2 text-sm text-destructive">
                          {form.formState.errors.linkedin.message}
                        </p>
                      )}
                    </Field>
                  </div>
                </div>

                {actionData?.success === false && (
                  <p className="mt-1 text-sm text-destructive">
                    {actionData.message}
                  </p>
                )}

                {/* Submit Button */}
                <div className="border-t pt-8">
                  <Button
                    type="submit"
                    className="w-full bg-primary py-6 text-primary-foreground hover:bg-primary/90"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Submitting..."
                      : "Submit Application"}
                  </Button>
                </div>
              </FieldGroup>
            </Form>
          </Card>
        </div>
      </section>
    </>
  );
}

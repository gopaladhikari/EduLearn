"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { CheckCircle, Upload } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { courseSchema, type CourseFormValues } from "~/schemas/course.schema";

const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cloud Computing",
  "UI/UX Design",
  "Business",
];
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Hindi",
];
const LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

export default function CreateCoursePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      level: "BEGINNER",
      price: 0,
      language: "English",
      thumbnail: "",
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CourseFormValues) => {
    const courseData = {
      ...data,
      thumbnail: thumbnailPreview || data.thumbnail,
    };
    console.log("Course created:", courseData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <section className="bg-linear-to-br from-primary/5 to-accent/5">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              Create Course
            </h1>
            <p className="text-xl text-muted-foreground">
              Create and share your course with students around the world.
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
                Course Created!
              </h2>
              <p className="mb-8 text-muted-foreground">
                Your course has been created successfully. You can now start
                adding lessons and content to your course.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Another Course
              </Button>
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
            Create Course
          </h1>
          <p className="text-xl text-muted-foreground">
            Create and share your course with students around the world.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-8">
                {/* Course Title */}
                <Field>
                  <FieldLabel htmlFor="title">
                    Course Title <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    A catchy title that describes what students will learn
                  </FieldDescription>
                  <Input
                    id="title"
                    placeholder="e.g., React.js Complete Guide for Beginners"
                    {...form.register("title")}
                    aria-invalid={!!form.formState.errors.title}
                  />
                  {form.formState.errors.title && (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </Field>

                {/* Subtitle */}
                <Field>
                  <FieldLabel htmlFor="subtitle">Course Subtitle</FieldLabel>
                  <FieldDescription>
                    A brief subtitle that complements the course title
                  </FieldDescription>
                  <Input
                    id="subtitle"
                    placeholder="Master React from Zero to Production"
                    {...form.register("subtitle")}
                    aria-invalid={!!form.formState.errors.subtitle}
                  />
                  {form.formState.errors.subtitle && (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.subtitle.message}
                    </p>
                  )}
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description">
                    Course Description{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    A comprehensive description of what the course covers
                  </FieldDescription>
                  <Textarea
                    id="description"
                    placeholder="Describe your course, what students will learn, and the key topics covered..."
                    rows={4}
                    {...form.register("description")}
                    aria-invalid={!!form.formState.errors.description}
                  />
                  {form.formState.errors.description && (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </Field>

                {/* Grid Layout for Form Fields */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Category */}
                  <Field>
                    <FieldLabel htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </FieldLabel>
                    <select
                      id="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                      {...form.register("category")}
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.category && (
                      <p className="mt-2 text-sm text-destructive">
                        {form.formState.errors.category.message}
                      </p>
                    )}
                  </Field>

                  {/* Level */}
                  <Field>
                    <FieldLabel htmlFor="level">
                      Course Level <span className="text-destructive">*</span>
                    </FieldLabel>
                    <select
                      id="level"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                      {...form.register("level")}
                    >
                      {LEVELS.map((lvl) => (
                        <option key={lvl.value} value={lvl.value}>
                          {lvl.label}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.level && (
                      <p className="mt-2 text-sm text-destructive">
                        {form.formState.errors.level.message}
                      </p>
                    )}
                  </Field>

                  {/* Price */}
                  <Field>
                    <FieldLabel htmlFor="price">
                      Price ($) <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="99.99"
                      {...form.register("price", { valueAsNumber: true })}
                      aria-invalid={!!form.formState.errors.price}
                    />
                    {form.formState.errors.price && (
                      <p className="mt-2 text-sm text-destructive">
                        {form.formState.errors.price.message}
                      </p>
                    )}
                  </Field>

                  {/* Language */}
                  <Field>
                    <FieldLabel htmlFor="language">
                      Language <span className="text-destructive">*</span>
                    </FieldLabel>
                    <select
                      id="language"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                      {...form.register("language")}
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.language && (
                      <p className="mt-2 text-sm text-destructive">
                        {form.formState.errors.language.message}
                      </p>
                    )}
                  </Field>
                </div>

                {/* Thumbnail Upload */}
                <Field>
                  <FieldLabel htmlFor="thumbnail">
                    Course Thumbnail <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    Upload a high-quality thumbnail image (1280x720px
                    recommended)
                  </FieldDescription>
                  <div className="rounded-lg border-2 border-dashed border-border p-8">
                    <label
                      htmlFor="thumbnail"
                      className="flex cursor-pointer flex-col items-center justify-center"
                    >
                      {thumbnailPreview ? (
                        <div className="w-full">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-48 w-full rounded-lg object-cover"
                          />
                          <p className="mt-2 text-center text-sm text-muted-foreground">
                            Click to change thumbnail
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="mb-2 h-12 w-12 text-muted-foreground" />
                          <p className="font-medium text-foreground">
                            Click to upload
                          </p>
                          <p className="text-sm text-muted-foreground">
                            or drag and drop
                          </p>
                        </>
                      )}
                      <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  </div>
                </Field>

                {/* Submit Button */}
                <div className="border-t pt-8">
                  <Button
                    type="submit"
                    className="w-full bg-primary py-6 text-primary-foreground hover:bg-primary/90"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Creating Course..."
                      : "Create Course"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Dropzone from "react-dropzone";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  courseSchema,
  type CourseSchema,
} from "@/schemas/courses.schema";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/queries/users.query";
import { useSeo } from "@/hooks/useSeo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UploadIcon, XIcon } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

export const Route = createFileRoute("/_protected/courses/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const [preview, setPreview] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const value = event.currentTarget.value.trim();

      if (value && !tags.includes(value)) {
        setTags((prevTags) => [...prevTags, value]);

        form.setValue("tags", [...tags, value]);
      }

      event.currentTarget.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);

    form.setValue("tags", updatedTags);
  };

  useSeo({
    title: "Add New Course",
    description: "Add new course",
  });

  const { data } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      video: new File([], ""),
    },
  });

  const onSubmit: SubmitHandler<CourseSchema> = (data) => {
    console.log(data);
  };

  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      form.setValue("video", file);
      const previewUrl = URL.createObjectURL(file);

      setPreview(previewUrl);
    },
    [form],
  );

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const selectables = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold text-primary">
        Add New Course
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="video"
            render={() => (
              <FormItem>
                <FormLabel>Course Video</FormLabel>
                <FormControl>
                  <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="grid cursor-pointer gap-2">
                            <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-12 transition-colors focus-within:outline-dashed focus-within:outline-2 focus-within:outline-gray-500 hover:border-gray-400 dark:border-gray-700 dark:focus-within:outline-gray-400 dark:hover:border-gray-600">
                              {preview ? (
                                <div className="text-center">
                                  {/* Video Preview */}
                                  <video
                                    src={preview}
                                    controls
                                    className="max-h-64 w-full rounded-md"
                                  />
                                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Video Preview
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
                                  <div className="mt-4 font-medium text-gray-900 dark:text-gray-50">
                                    Drop files to upload
                                  </div>
                                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    or click to select files
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </FormControl>
                <FormDescription>
                  The video of your course
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter course title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The title of your course (max 100 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Enter course description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of your course (max 500
                  characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Instructor</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={selectables}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select options"
                    variant="inverted"
                    animation={2}
                    maxCount={5}
                  />
                </FormControl>
                <FormDescription>
                  Choose the frameworks you are interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter course price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="w-full">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Add tags..."
                        className="w-full"
                        onKeyDown={handleAddTag}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-medium"
                        >
                          {tag}
                          <Button
                            size="icon"
                            type="button"
                            onClick={() => handleRemoveTag(tag)} // Remove tag
                          >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Remove tag
                            </span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Enter tags separated by commas or press "Enter" to
                  add them (e.g., "programming, web development,
                  react").
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Adding Course..."
              : "Add Course"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

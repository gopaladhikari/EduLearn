import { createFileRoute } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/_protected/courses/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      video: new File([], ""),
    },
  });

  const onSubmit: SubmitHandler<CourseSchema> = (data) => {
    console.log(data);
  };

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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Video</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter course video"
                    type="file"
                    onChange={(e) =>
                      field.onChange(
                        e.target.files ? e.target.files[0] : null,
                      )
                    }
                  />
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
                <FormLabel>Instructor Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter instructor name"
                    {...field}
                  />
                </FormControl>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tags separated by commas"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(",")
                          .map((tag) => tag.trim()),
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  Enter tags separated by commas (e.g., "programming,
                  web development, react")
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

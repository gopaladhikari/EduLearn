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
import {
  CourseCategory,
  courseSchema,
  type CourseSchema,
} from "@/schemas/courses.schema";
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TipTap } from "@/components/courses/TipTap";
import { FileUploadField } from "@/components/ui/FileUploadField";
import { FormInputField } from "@/components/ui/FormInputField";
import type { Course, User } from "@/types";

interface CourseFormProps {
  initialData?: Partial<Course>;
  onSubmit: SubmitHandler<CourseSchema>;
  isSubmitting: boolean;
  instructors: User[];
}

export function CourseForm({
  initialData,
  onSubmit,
  isSubmitting,
  instructors,
}: CourseFormProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      category: initialData?.category as CourseCategory,
      description: initialData?.description,
      instructor: initialData?.instructor,
      price: initialData?.price,
      tags: initialData?.tags,
      title: initialData?.title,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        category: initialData?.category as CourseCategory,
        description: initialData?.description,
        instructor: initialData?.instructor,
        price: initialData?.price,
        tags: initialData?.tags,
        title: initialData?.title,
      });
      setTags(initialData.tags || []);
    }
  }, [initialData, form]);

  const handleAddTag = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value && !tags.includes(value)) {
        const newTags = [...tags, value];
        setTags(newTags);
        form.setValue("tags", newTags);
      }
      event.currentTarget.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FileUploadField
          name="video"
          label="Course Video"
          description="Upload the course video (MP4, Max 10MB)"
          accept={{ "video/*": [".mp4"] }}
          maxSize={1024 * 1024 * 10}
          previewType="video"
          form={form}
          existingFile={initialData?.video}
        />

        <FileUploadField
          name="thumbnail"
          label="Video Thumbnail"
          description="Upload a thumbnail image (JPEG, PNG, Max 5MB)"
          accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
          maxSize={1024 * 1024 * 5}
          previewType="image"
          form={form}
          existingFile={initialData?.thumbnail}
        />

        <FormInputField
          name="title"
          control={form.control}
          label="Course Title"
          placeholder="Enter course title"
        />

        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <TipTap />
              </FormControl>
              <FormDescription>
                Detailed description about your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(CourseCategory).map(
                        (category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
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
                  options={instructors}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select instructors"
                  variant="inverted"
                  animation={2}
                  maxCount={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInputField
          control={form.control}
          label="Price"
          name="price"
          description="Course price in USD"
          inputProps={{
            type: "number",
            inputMode: "numeric",
          }}
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
                        className="bg-primary flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {tag}
                        <Button
                          size="icon"
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          variant="ghost"
                        >
                          <XIcon className="h-4 w-4" />
                          <span className="sr-only">Remove tag</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Enter tags separated by commas or press "Enter" to add
                them
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Save Course"}
        </Button>
      </form>
    </Form>
  );
}

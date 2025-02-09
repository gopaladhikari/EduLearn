import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TipTap } from "@/components/courses/TipTap";
import { useMemo, useState } from "react";
import { FileUploadField } from "../ui/FileUploadField";
import { FormInputField } from "../ui/FormInputField";
import { MultiSelect } from "../ui/multi-select";
import { XIcon } from "lucide-react";
import { useAllUsers } from "@/lib/queries/users.query";

type Props = {
  onSubmit: () => void;
};

export function CourseForm({ onSubmit }: Props) {
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
  });

  const { data } = useAllUsers();

  const selectables = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const handleAddTag = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const value = event.currentTarget.value;

      if (value && !tags.includes(value)) {
        setTags((prevTags) => [...prevTags, value]);
        form.clearErrors("tags");
        form.setValue("tags", tags);
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
          accept={{
            "video/*": [".mp4"],
          }}
          maxSize={1024 * 1024 * 10}
          previewType="video"
          form={form}
        />

        <FileUploadField
          name="thumbnail"
          label="Video Thumbnail"
          description="Upload a thumbnail image (JPEG, PNG, Max 5MB)"
          accept={{
            "image/*": [".jpg", ".jpeg", ".png"],
          }}
          maxSize={1024 * 1024 * 5} // 5MB
          previewType="image"
          form={form}
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
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Course Category</FormLabel>
              <FormControl>
                <Select
                  value={value}
                  onValueChange={onChange}
                  {...rest}
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
                Select the instructor featured in this course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInputField
          control={form.control}
          label="Price"
          name="price"
          description="This is your course price"
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
                them (e.g., "programming, web development, react").
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Adding Course..."
            : "Add Course"}
        </Button>
      </form>
    </Form>
  );
}

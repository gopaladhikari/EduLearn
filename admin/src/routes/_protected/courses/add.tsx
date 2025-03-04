// routes/AddCourse.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CourseForm } from "@/components/courses/CourseForm";
import { axiosInstance } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import type { Course, User } from "@/types";
import type { CourseSchema } from "@/schemas/courses.schema";

export const Route = createFileRoute("/_protected/courses/add")({
  component: AddCourse,
  loader: async () => {
    const { data } = await axiosInstance.get<User[]>("/api/users", {
      params: { status: "active", verified: true, role: "admin" },
    });
    return data.data;
  },
});

function AddCourse() {
  const { toast } = useToast();
  const instructors = Route.useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (formData: CourseSchema) => {
    try {
      const { data } = await axiosInstance.post<Course>(
        "/api/courses",
        {
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      toast({
        title: "Course Added",
        description: "Your course has been added successfully",
        variant: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      navigate({
        to: "/courses/$slug",
        params: { slug: data.data.slug },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      <h1 className="mb-4">Add New Course</h1>
      <CourseForm
        onSubmit={handleSubmit}
        isSubmitting={false}
        instructors={instructors}
      />
    </section>
  );
}

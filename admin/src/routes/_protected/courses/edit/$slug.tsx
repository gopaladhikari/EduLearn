// routes/EditCourse.tsx
import { createFileRoute } from "@tanstack/react-router";
import { CourseForm } from "@/components/courses/CourseForm";
import { axiosInstance } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import type { Course, User } from "@/types";
import type { CourseSchema } from "@/schemas/courses.schema";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/courses/edit/$slug",
)({
  component: EditCourse,
  loader: async ({ params }) => {
    const [course, instructors] = await Promise.all([
      axiosInstance.get<Course>(`/api/courses/${params.slug}`),
      axiosInstance.get<User[]>("/api/users", {
        params: { status: "active", verified: true, role: "admin" },
      }),
    ]);
    return {
      course: course.data.data,
      instructors: instructors.data.data,
    };
  },
});

function EditCourse() {
  const { toast } = useToast();
  const { course, instructors } = Route.useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (formData: CourseSchema) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/courses/${course.slug}`,
        {
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      toast({
        title: "Course Updated",
        description: "Your course has been updated successfully",
        variant: "success",
      });

      await queryClient.invalidateQueries({
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
      <h1 className="mb-4">Edit Course</h1>
      <CourseForm
        initialData={course}
        onSubmit={handleSubmit}
        isSubmitting={false}
        instructors={instructors}
      />
    </section>
  );
}

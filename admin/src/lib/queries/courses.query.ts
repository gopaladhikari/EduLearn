import { axiosInstance } from "@/config/axios";
import type { Course, CourseWithInstructors } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const { data } =
          await axiosInstance.get<Course[]>("/api/courses");
        return data.data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

type GetCourseBySlugArgs = {
  slug: string;
};

export const useCourseBySlug = ({ slug }: GetCourseBySlugArgs) => {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      try {
        const { data } =
          await axiosInstance.get<CourseWithInstructors>(
            `/api/courses/${slug}`,
          );
        return data.data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

import {
  getAllCourses,
  getCourseBySlug,
} from "@/lib/queries/courses.query";
import type { Course, CourseWithInstructors } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type GetAllCoursesQueryOptions = UseQueryOptions<Course[], Error>;

export const useGetAllCourses = (
  options?: GetAllCoursesQueryOptions,
) => {
  return useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await getAllCourses();
      return response.data;
    },
    ...options,
  });
};

type UserGetCourseBySlugQueryArgs = {
  slug: string;
  options?: UseQueryOptions<CourseWithInstructors, Error>;
};

export const useGetCourseBySlug = ({
  slug,
  options,
}: UserGetCourseBySlugQueryArgs) => {
  return useQuery<CourseWithInstructors, Error>({
    queryKey: ["course", slug],
    queryFn: async () => {
      const response = await getCourseBySlug(slug);
      return response.data;
    },
    ...options,
  });
};

import { axiosInstance } from "@/config/axios";
import type { CourseAnalytics, PlatformAnalytics } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePlatformAnalytics = () => {
  return useQuery({
    queryKey: ["platformAnalytics"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<PlatformAnalytics>(
          "/api/analytics/platform",
        );
        return data.data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

type GetCourseAnalyticsBySlugArgs = {
  slug: string;
};

export const useCourseAnalyticsBySlug = ({
  slug,
}: GetCourseAnalyticsBySlugArgs) => {
  return useQuery({
    queryKey: ["courseAnalytics"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<CourseAnalytics>(
          "/api/analytics/course/" + slug,
        );
        return data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

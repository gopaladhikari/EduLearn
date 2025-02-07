import { axiosInstance } from "@/config/axios";
import type {
  CourseAnalytics,
  CustomResponse,
  PlatformAnalytics,
} from "@/types";

export const getPlatformAnalytics =
  async (): CustomResponse<PlatformAnalytics> => {
    try {
      const { data } = await axiosInstance.get(
        "/api/analytics/platform",
      );
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

export const getCourseAnalyticsBySlug = async (
  slug: string,
): CustomResponse<CourseAnalytics> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/analytics/course/${slug}`,
    );
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

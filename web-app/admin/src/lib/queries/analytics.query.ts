import { axiosInstance } from "@/config/axios";

export const getCourseAnalyticsBySlug = async (slug: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/analytics/${slug}`,
    );
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

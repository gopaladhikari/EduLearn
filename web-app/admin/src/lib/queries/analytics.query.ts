import { axiosInstance } from "@/config/axios";
import { throwError } from "../utils";

export const getCourseAnalyticsBySlug = async (slug: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/analytics/${slug}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

import { axiosInstance } from "@/config/axios";
import type { CustomResponse, PlatformAnalytics } from "@/types";

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

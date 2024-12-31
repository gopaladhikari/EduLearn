import { axiosInstance } from "@/config/axios";
import type { CustomResponse, User } from "@/types";

export const me = async (): CustomResponse<User> => {
  try {
    const { data } = await axiosInstance.get("/api/users/me");
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

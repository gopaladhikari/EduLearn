import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";

export const updateUserMutation = async (formData: Partial<User>) => {
  try {
    const { data } = await axiosInstance.patch<User>(
      "/api/users",
      formData,
    );
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

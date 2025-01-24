import { axiosInstance } from "@/config/axios";
import type { CustomResponse, User } from "@/types";

export const updateUserMutation = async (
  formData: Partial<User>,
): CustomResponse<User> => {
  try {
    const { data } = await axiosInstance.patch(
      "/api/users",
      formData,
    );
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

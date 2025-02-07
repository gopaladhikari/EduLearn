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

export const getAllUsers = async (): CustomResponse<User[]> => {
  try {
    const { data } = await axiosInstance.get("/api/users", {
      params: {
        status: "active",
        verified: true,
        role: "admin",
      },
    });
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUserById = async (
  id: string,
): CustomResponse<User> => {
  try {
    const { data } = await axiosInstance.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

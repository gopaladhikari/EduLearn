import type { RegisterSchema } from "@/schemas/auth.schema";
import type { CustomResponse, User } from "@/types";
import { axiosInstance } from "config/axios";

export const registerUser = async (data: RegisterSchema) => {
  try {
    const { data: user } = await axiosInstance.post("/api/users", {
      ...data,
      role: "user",
    });

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const loginUser = async (data: any) => {
  try {
    const { data: user } = await axiosInstance.post(
      "/api/auth/login",
      data
    );

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const me = async (): CustomResponse<User> => {
  try {
    const { data } = await axiosInstance.get("/api/users/me");
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

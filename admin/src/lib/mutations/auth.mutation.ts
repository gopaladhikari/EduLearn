import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";

export const registerMutation = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post<User>("/api/users", {
      ...formData,
      role: "admin",
    });

    return data.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const loginMutation = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/login",
      formData,
    );

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const resetPasswordMutation = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/reset-password",
      formData,
      {},
    );

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const verifyEmailMutation = async (
  email: string,
  token: string,
) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/verify-email",
      {
        email,
        token,
      },
    );

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const logoutMutation = async () => {
  try {
    const { data } = await axiosInstance.post("/api/auth/logout");
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

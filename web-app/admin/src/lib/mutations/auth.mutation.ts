import { axiosInstance } from "@/config/axios";
import type { ConfirmPasswordSchema } from "@/schemas/confirm-password.schema";
import { throwError } from "../utils";

type Data = {
  email: string;
  password: string;
};
export const registerMutation = async (formData: Data) => {
  try {
    const { data } = await axiosInstance.post("/api/users", {
      ...formData,
      role: "admin",
    });

    return data;
  } catch (error) {
    throwError(error as Error);
  }
};

export const loginMutation = async (formData: Data) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/login",
      formData,
    );
    return data;
  } catch (error) {
    throwError(error as Error);
  }
};

export const requestForgotPassword = async (email: string) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/forgot-password",
      {
        email,
      },
    );

    return data;
  } catch (error) {
    throwError(error as Error);
  }
};

export const confirmForgotPassword = async (
  formData: ConfirmPasswordSchema,
  token: string,
) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/confirm-forgot-password",
      {
        ...formData,
        token,
      },
    );

    return data;
  } catch (error) {
    throwError(error as Error);
  }
};

export const resetPasswordMutation = async (formData: Data) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/reset-password",
      formData,
    );

    return data;
  } catch (error) {
    throwError(error as Error);
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
    throwError(error as Error);
  }
};

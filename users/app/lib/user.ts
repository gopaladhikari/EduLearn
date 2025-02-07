import { axiosInstance } from "@/config/axios";
import type { Cart, User } from "@/types";

export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get<User>("/api/users/me");
    return data;
  } catch (error) {
    return null;
  }
};

export const getCartItems = async () => {
  try {
    const { data } = await axiosInstance.get<Cart>("/api/cart");
    return data;
  } catch (error) {
    return null;
  }
};

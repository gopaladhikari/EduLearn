import { axiosInstance } from "@/config/axios";
import type { AxiosError } from "axios";

export const deleteCourse = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/api/courses/${id}`);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const togglePublishCourse = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/courses/publish/${id}`,
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

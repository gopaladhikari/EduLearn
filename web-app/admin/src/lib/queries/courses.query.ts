import { axiosInstance } from "@/config/axios";
import type { Course, CustomResponse } from "@/types";

export const getAllCourses = async (): CustomResponse<Course[]> => {
  try {
    const { data } = await axiosInstance.get("/api/courses");
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getCourseById = async (
  id: string,
): CustomResponse<Course> => {
  try {
    const { data } = await axiosInstance.get(`/api/courses/${id}`);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

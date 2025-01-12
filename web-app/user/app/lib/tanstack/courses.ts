import { axiosInstance } from "config/axios";

export const getAllCourses = async () => {
  try {
    const { data } = await axiosInstance.get("/courses");

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

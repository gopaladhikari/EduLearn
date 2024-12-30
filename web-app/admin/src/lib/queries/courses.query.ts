import type { Course, CustomResponse } from "@/types";

export const getAllCourses = async (): CustomResponse<Course[]> => {
  const res = await fetch("/api/courses");

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getCourseById = async (id: string): CustomResponse<Course> => {
  const res = await fetch(`/api/courses/${id}`);

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

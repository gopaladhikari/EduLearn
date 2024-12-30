import type { Course } from "@/types";

export const getAllCourses = async (): Promise<Course[]> => {
  const res = await fetch("/api/courses");

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const res = await fetch(`/api/courses/${id}`);

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

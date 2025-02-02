import { axiosInstance } from "@/config/axios";
import type { Course } from "@/types";
import {
  type MetaFunction,
  type LoaderFunction,
  useNavigation,
} from "react-router";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await axiosInstance.get<Course>(
      `/api/courses/${params.slug}`,
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const meta: MetaFunction = ({ data }) => {
  const course = data as Course | null;

  return [
    {
      title: course?.title ?? "Course Detail | EduLearn",
      description:
        course?.description ??
        "Learn about the course detail page and its features. Explore the page to see how it works.",
    },
    {
      name: "og:title",
      content: course?.title ?? "Course Detail | EduLearn",
    },
    {
      name: "og:description",
      content:
        course?.description ??
        "Learn about the course detail page and its features. Explore the page to see how it works.",
    },
  ];
};

export default function CoureseDetail() {
  const navigation = useNavigation();
  const isNavigation = Boolean(navigation.location);

  if (isNavigation) return <div>Loading...</div>;

  return <div>CoureseDetail</div>;
}

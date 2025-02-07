import { axiosInstance } from "@/config/axios";
import type { Course } from "@/types";
import { useNavigation } from "react-router";
import type { Route } from "./+types/course-detail";

export const loader = async ({ params }: Route.LoaderArgs) => {
  try {
    const { data } = await axiosInstance.get<Course>(
      `/api/courses/${params.slug}`,
    );

    return data.data;
  } catch (error) {
    return null;
  }
};

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: data?.title,
      description:
        data?.description ??
        "Learn about the course detail page and its features. Explore the page to see how it works.",
    },
    {
      name: "og:title",
      content: data?.title ?? "Course Detail | EduLearn",
    },
    {
      name: "og:description",
      content:
        data?.description ??
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

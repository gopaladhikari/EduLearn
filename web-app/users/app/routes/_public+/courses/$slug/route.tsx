import CourseContent from "@/components/courses/CourseContent";
import CourseDescription from "@/components/courses/CourseDescription";
import CourseHero from "@/components/courses/CourseHero";
import CourseIncludes from "@/components/courses/CourseIncludes";
import InstructorDetails from "@/components/courses/InstructorDetails";
import OtherCoursesFromInstructor from "@/components/courses/OtherCoursesFromInstructor";
import Prerequisites from "@/components/courses/Prerequisites";
import RatingsAndReviews from "@/components/courses/RatingsAndReviews";
import SimilarCourses from "@/components/courses/SimilarCourses";
import WhatYouWillLearn from "@/components/courses/WhatYouWillLearn";
import WhoThisCourseIsFor from "@/components/courses/WhoThisCourseIsFor";
import { axiosInstance } from "@/config/axios";
import { Course, type CourseWithInstructors } from "@/types";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Course Details",
      description: "Detailed information about the course",
    },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await axiosInstance.get(`/api/courses/${params.slug}`);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default function CoursePage() {
  const data = useLoaderData<typeof loader>() as {
    data: CourseWithInstructors;
  };

  return (
    <>
      <CourseHero course={data?.data} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <WhatYouWillLearn />
          <CourseContent course={data?.data} />
          <Prerequisites />
          <CourseDescription course={data?.data} />
          <WhoThisCourseIsFor />
          <RatingsAndReviews course={data?.data} />
        </div>
        <div className="md:col-span-1">
          <CourseIncludes course={data?.data} />
          <SimilarCourses category={data?.data.category} />
        </div>
      </div>
      <InstructorDetails instructors={data?.data.instructor} />
      <OtherCoursesFromInstructor instructors={data?.data.instructor} />
    </>
  );
}

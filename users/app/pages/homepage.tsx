import { CourseCard } from "@/components/courses/CourseCard";
import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/config/axios";
import type { Course } from "@/types";
import { data as response } from "react-router";
import { Award, BookOpen, Play, Users } from "lucide-react";
import { getSession } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { Route } from "./+types/homepage";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title:
        "EduLearn | Master New Skills with Expert-Led Online Courses",
      description:
        "Join EduLearn – Your Gateway to Lifelong Learning! Explore thousands of courses taught by industry experts. Learn at your own pace, earn certificates, and transform your career today.",
    },
    {
      name: "og:title",
      content: "EduLearn: Learn Anything, Anytime, Anywhere",
    },
    {
      name: "og:description",
      content:
        "Discover interactive courses, connect with global instructors, and advance your skills with EduLearn. Start your learning journey now!",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  try {
    const {
      data: { data },
    } = await axiosInstance.get<Course[]>("/api/courses", {
      params: {
        limit: 3,
        skip: 0,
      },
    });

    return response(
      {
        courses: data,
        user,
      },
      {
        headers: {
          "Cache-control":
            "public, max-age=900, must-revalidate, immutable",
        },
      },
    );
  } catch (error) {
    return {
      courses: [],
      user,
    };
  }
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formdata = await request.formData();
  const values = Object.fromEntries(formdata);

  console.log(values);

  if (values.name === "addToCart") {
    const { price, courseId } = values;

    try {
      await axiosInstance.post(`/api/cart/${courseId}`, {
        price,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return values;
};

export default function Homepage({
  loaderData,
}: Route.ComponentProps) {
  const { courses, user } = loaderData;
  return (
    <MaxWithWrapper>
      {user && (
        <section>
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar?.url} />
              <AvatarFallback>
                {user.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Welcome back, {user.fullName}!
              </h2>
              <p className="text-muted-foreground text-sm">
                Start learning now or check out your courses.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="group">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="group-hover:text-primary mb-6 transition-colors ease-linear">
              Learn Without Limits
            </h1>
            <p className="mb-8 text-xl transition-colors ease-linear dark:group-hover:text-stone-300">
              Start, switch, or advance your career with thousands of
              courses from expert instructors.
            </p>
            <div className="flex space-x-4">
              <Button variant="secondary">
                <Play />
                Start Learning
              </Button>
              <Button>Try For Free</Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Students learning"
              title="Students learning"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-center space-x-4 rounded-xl p-6">
              <Users className="h-12 w-12 text-blue-600" />
              <div>
                <h3 className="text-3xl font-bold">50K+</h3>
                <p>Active Students</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-xl p-6">
              <BookOpen className="h-12 w-12 text-blue-600" />
              <div>
                <h3 className="text-3xl font-bold">1000+</h3>
                <p>Online Courses</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-xl p-6">
              <Award className="h-12 w-12 text-blue-600" />
              <div>
                <h3 className="text-3xl font-bold">200+</h3>
                <p>Expert Instructors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Courses */}
      {courses?.length > 0 && (
        <section>
          <h2 className="mb-12 text-center text-3xl font-bold">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}
      <section className="rounded bg-blue-600 py-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Join thousands of students who are already learning and
            growing with us. Get started today with our free courses!
          </p>
          <button className="hover: rounded-lg bg-white px-8 py-4 font-semibold text-blue-600">
            Browse All Courses
          </button>
        </div>
      </section>
    </MaxWithWrapper>
  );
}

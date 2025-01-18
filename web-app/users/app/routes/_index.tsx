import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/config/axios";
import { site } from "@/config/site";
import type { Course } from "@/types";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BookOpen, Users, Award, Play } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: site.title },
    { name: "description", content: site.description },
  ];
};

type Data = {
  data: Course[];
};

export const loader: LoaderFunction = async () => {
  try {
    const { data } = await axiosInstance.get("/api/courses", {
      params: {
        limit: 3,
        skip: 0,
      },
    });

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

export default function Index() {
  const data = useLoaderData<Data>();

  // console.log(error);

  return (
    <>
      <section className="group pb-20 pt-16">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="mb-6 text-5xl font-bold transition-colors ease-linear group-hover:text-primary">
              Learn Without Limits
            </h1>
            <p className="mb-8 text-xl transition-colors ease-linear group-hover:dark:text-stone-300">
              Start, switch, or advance your career with thousands of courses
              from expert instructors.
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
      <section className="bg-secondary py-20">
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.data?.map((course) => (
              <CourseCard key={course._id} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Join thousands of students who are already learning and growing with
            us. Get started today with our free courses!
          </p>
          <button className="hover: rounded-lg bg-white px-8 py-4 font-semibold text-blue-600">
            Browse All Courses
          </button>
        </div>
      </section>
    </>
  );
}

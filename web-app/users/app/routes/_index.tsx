import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import type { MetaFunction } from "@remix-run/node";
import { BookOpen, Users, Award, Play, Star } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: site.title },
    { name: "description", content: site.description },
  ];
};

export default function Index() {
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
            {[1, 2, 3].map((course) => (
              <div
                key={course}
                className="overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
              >
                <img
                  src={`https://images.unsplash.com/photo-151818${course}44484-6ef05ac4${course}6d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                  alt="Course thumbnail"
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <div className="mb-2 flex items-center space-x-2">
                    <span className="rounded-full px-3 py-1 text-sm text-blue-600">
                      Development
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">4.8</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Complete Web Development Course
                  </h3>
                  <p className="mb-4">
                    Learn web development from scratch with practical projects
                    and exercises.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      $49.99
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
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

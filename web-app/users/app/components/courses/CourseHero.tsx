import type { CourseWithInstructors } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export default function CourseHero({
  course,
}: {
  course: CourseWithInstructors;
}) {
  return (
    <section className="flex w-full items-start gap-4 rounded-lg bg-gradient-to-r py-8 shadow-xl">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="mb-4 basis-2/4 rounded-lg"
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
        <p className="mb-6 line-clamp-3 text-xl">{course.description}</p>
        <div className="mb-6 flex items-center space-x-4">
          <Badge variant="secondary" className="text-sm">
            {course.category}
          </Badge>
          {course.isPopular && (
            <Badge variant="outline" className="text-sm">
              Popular
            </Badge>
          )}
          {course.isBestSeller && (
            <Badge variant="outline" className="text-sm">
              Bestseller
            </Badge>
          )}
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <p className="text-2xl font-bold">${course.price.toFixed(2)}</p>
          <Button size="lg">Enroll Now</Button>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={course.instructor[0].avatar || "/placeholder.svg"}
            alt={course.instructor[0].name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{course.instructor[0].name}</p>
            <p className="text-sm opacity-75">{course.instructor[0].title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

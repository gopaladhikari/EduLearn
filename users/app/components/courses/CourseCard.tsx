import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

type Props = {
  optimisticAddToCart: (course: Course) => void;
  course: Course;
};

export function CourseCard({ course, optimisticAddToCart }: Props) {
  return (
    <Card className="group">
      <CardHeader>
        <Link to={`/courses/${course.slug}`}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-48 w-full object-cover"
          />
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full py-1 text-sm text-blue-600">
            {course.category}
          </span>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">4.8</span>
          </div>
        </div>
        <CardTitle className="transition-colors group-hover:text-primary">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <span className="text-2xl font-bold text-blue-600">
          ${course.price}
        </span>

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          name="addToCart"
          onClick={() => optimisticAddToCart(course)}
          value={JSON.stringify({
            _id: course._id,
            price: course.price,
          })}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

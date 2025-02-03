import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types";
import { Star } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Link, useFetcher } from "react-router";
import { useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

type Props = {
  course: Course;
};

export function CourseCard({ course }: Props) {
  const { cart, setCart } = useCart();
  const fetcher = useFetcher();

  const isInCart = cart?.items.some(
    (item) => item.courseId._id === course._id,
  );

  const optimisticAddToCart = useCallback(
    (course: Course) => {
      setCart((prev) => {
        if (!prev) {
          return {
            userId: "",
            _id: "",
            items: [
              {
                addedAt: new Date(),
                courseId: course,
                priceAtAddition: course.price,
              },
            ],
            totalItems: 1,
            totalPrice: course.price,
          };
        }

        return {
          ...prev,
          items: [
            ...prev.items,
            {
              addedAt: new Date(),
              courseId: course,
              priceAtAddition: course.price,
            },
          ],
          totalItems: prev.totalItems + 1,
          totalPrice: prev.totalPrice + course.price,
        };
      });
      fetcher.submit(
        {
          name: "addToCart",
          price: course.price,
          courseId: course._id,
        },
        {
          method: "POST",
        },
      );
    },
    [setCart, fetcher],
  );
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

        {isInCart ? (
          <Link
            to="/cart"
            className={cn(
              buttonVariants(),
              "bg-blue-600 hover:bg-blue-700",
            )}
          >
            Go to Cart
          </Link>
        ) : (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            name="addToCart"
            onClick={() => optimisticAddToCart(course)}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

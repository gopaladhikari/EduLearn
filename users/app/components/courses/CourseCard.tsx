import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types";
import { Heart, Star } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Link, useFetcher } from "react-router";
import { useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import parser from "html-react-parser";

type Props = {
  course: Course;
};

export function CourseCard({ course }: Props) {
  const { cart, setCart } = useCart();
  const fetcher = useFetcher();

  const parsed = parser(course.description);

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
            src={course.thumbnail.url}
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
        <CardTitle className="group-hover:text-primary transition-colors">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {parsed}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-4">
        <span className="text-2xl font-bold text-blue-600">
          ${course.price}
        </span>

        <Button
          className="mr-4 ml-auto cursor-pointer"
          title="Add to Wishlist"
          variant="outline"
        >
          <Heart />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        {isInCart ? (
          <Link
            to="/cart"
            className={cn(buttonVariants({ variant: "bluish" }))}
          >
            Go to Cart
          </Link>
        ) : (
          <>
            <Button
              variant="bluish"
              name="addToCart"
              onClick={() => optimisticAddToCart(course)}
            >
              Add to cart
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

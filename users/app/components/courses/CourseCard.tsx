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
import { Form, Link } from "react-router";

export function CourseCard({
  _id,
  category,
  description,
  price,
  slug,
  title,
  thumbnail,
}: Course) {
  return (
    <Card className="group">
      <CardHeader>
        <Link to={`/courses/${slug}`}>
          <img
            src={thumbnail}
            alt={title}
            className="h-48 w-full object-cover"
          />
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full py-1 text-sm text-blue-600">
            {category}
          </span>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">4.8</span>
          </div>
        </div>
        <CardTitle className="transition-colors group-hover:text-primary">
          <Link to={`/courses/${slug}`}>{title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <span className="text-2xl font-bold text-blue-600">
          ${price}
        </span>

        <Form method="post" navigate={false}>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            name="addToCart"
            value={JSON.stringify({ _id, price })}
          >
            Add to cart
          </Button>
        </Form>
      </CardFooter>
    </Card>
  );
}

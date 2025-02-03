import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types";
import { Card } from "../ui/card";

export default function CartItems({ courseId }: CartItem) {
  return (
    <Card
      key={courseId._id}
      className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow"
    >
      <img
        src={courseId?.thumbnail}
        alt={courseId.title}
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{courseId.title}</h3>
        <p className="text-sm text-gray-600">
          Instructor: {courseId.instructor}
        </p>
        <p className="mt-1 font-bold">${courseId.price}</p>
      </div>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-5 w-5 text-red-500" />
        <span className="sr-only">Remove item</span>
      </Button>
    </Card>
  );
}

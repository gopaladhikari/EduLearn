import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types";
import { Card } from "../ui/card";

type Props = {
  item: CartItem;
  onDelete: (itemId: string) => void;
};

export default function CartItems({ item, onDelete }: Props) {
  return (
    <Card
      key={item.courseId._id}
      className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow"
    >
      <img
        src={item.courseId?.thumbnail}
        alt={item.courseId.title}
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.courseId.title}</h3>
        <p className="text-sm text-gray-600">
          Instructor: {item.courseId.instructor}
        </p>
        <p className="mt-1 font-bold">${item.courseId.price}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(item.courseId._id as string)}
      >
        <Trash2 className="h-5 w-5 text-destructive" />
        <span className="sr-only">Remove item</span>
      </Button>
    </Card>
  );
}

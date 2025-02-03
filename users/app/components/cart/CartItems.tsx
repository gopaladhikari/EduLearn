import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types";
import { Card } from "../ui/card";
import { useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { useFetcher } from "react-router";

type Props = {
  item: CartItem;
};

export default function CartItems({ item }: Props) {
  const { cart, setCart } = useCart();
  const fetcher = useFetcher();

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      const newCart =
        cart?.items?.filter((item) => item.courseId._id !== itemId) ||
        [];

      const newTotalItems = newCart?.length;
      const newTotalPrice = newCart?.reduce(
        (total, item) => total + item.priceAtAddition,
        0,
      );

      setCart((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          items: newCart,
          totalItems: newTotalItems,
          totalPrice: newTotalPrice,
        };
      });
      fetcher.submit(
        { itemId, name: "deleteItem" },
        {
          method: "DELETE",
        },
      );
    },

    [cart?.items, fetcher, setCart],
  );
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

        <p className="mt-1 font-bold">${item.courseId.price}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDeleteItem(item.courseId._id as string)}
      >
        <Trash2 className="h-5 w-5 text-destructive" />
        <span className="sr-only">Remove item</span>
      </Button>
    </Card>
  );
}

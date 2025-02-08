import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types";
import { Card } from "../ui/card";
import { useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { Link, useFetcher } from "react-router";

type Props = {
  item: CartItem;
};

export default function CartItems({ item }: Props) {
  const { cart, setCart } = useCart();
  const fetcher = useFetcher();

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      const newCart =
        cart?.items?.filter((item) => item.course._id !== itemId) ||
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
      key={item.course._id}
      className="group flex items-center space-x-4 rounded-lg bg-white p-4 shadow-sm"
    >
      <img
        src={item.course?.thumbnail?.url}
        alt={item.course.title}
        width={100}
        height={100}
        className="aspect-[3/2] object-contain"
      />

      <div className="grow">
        <Link to={`/courses/${item.course.slug}`}>
          <h3 className="group-hover:text-primary font-semibold transition-colors">
            {item.course.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm font-bold">
          ${item.course.price}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDeleteItem(item.course._id as string)}
      >
        <Trash2 className="text-destructive h-5 w-5" />
        <span className="sr-only">Remove item</span>
      </Button>
    </Card>
  );
}

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: string;
  title: string;
  instructor: string;
  price: number;
  image: string;
};

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "Introduction to Machine Learning",
      instructor: "Dr. Jane Smith",
      price: 79.99,
      image: "/placeholder.svg",
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      instructor: "John Doe",
      price: 99.99,
      image: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      instructor: "Prof. Alex Johnson",
      price: 89.99,
      image: "/placeholder.svg",
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow"
        >
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={80}
            height={80}
            className="rounded-md"
          />
          <div className="flex-grow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">
              Instructor: {item.instructor}
            </p>
            <p className="mt-1 font-bold">${item.price.toFixed(2)}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-5 w-5 text-red-500" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      ))}
      {cartItems.length === 0 && (
        <p className="text-center text-gray-500">
          Your cart is empty.
        </p>
      )}
    </div>
  );
}

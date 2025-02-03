import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import { axiosInstance } from "@/config/axios";
import { useCart } from "@/hooks/useCart";
import type { Cart } from "@/types";
import {
  useLoaderData,
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
} from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Your Cart | EduLearn",
      description:
        "View your cart and manage your purchases. Checkout with ease and enjoy your learning journey.",
    },
    {
      name: "og:title",
      content: "Your Cart | EduLearn",
    },
    {
      name: "og:description",
      content:
        "View your cart and manage your purchases. Checkout with ease and enjoy your learning journey.",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get<Cart>("/api/cart");

    return data;
  } catch (error) {
    return null;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const values = Object.fromEntries(formData);
  console.log(values);

  if (values.name === "deleteItem") {
    try {
      const { data } = await axiosInstance.delete(
        `/api/cart/${values.itemId}`,
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return values;
};

export default function Cart() {
  const data = useLoaderData() as Cart | null;

  const { cart } = useCart();

  return (
    <MaxWithWrapper as="section">
      <h1>Your Cart</h1>
      {data?.items.length === 0 && (
        <p className="text-muted-foreground"> No items in cart</p>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {cart?.items?.map((item) => (
            <CartItems key={item.courseId._id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary
            totalItems={cart?.totalItems}
            totalPrice={cart?.totalPrice}
          />
        </div>
      </div>
    </MaxWithWrapper>
  );
}

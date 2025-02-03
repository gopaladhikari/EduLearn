import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import { axiosInstance } from "@/config/axios";
import type { Cart } from "@/types";
import {
  useLoaderData,
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

export default function Cart() {
  const data = useLoaderData() as Cart | null;

  return (
    <MaxWithWrapper as="section">
      <h1>Your Cart</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {data?.items?.map((item) => (
            <CartItems
              key={item.courseId._id}
              addedAt={item.addedAt}
              courseId={item.courseId}
              priceAtAddition={item.priceAtAddition}
            />
          ))}
        </div>
        <div>
          <CartSummary
            totalItems={data?.totalItems}
            totalPrice={data?.totalPrice}
          />
        </div>
      </div>
    </MaxWithWrapper>
  );
}

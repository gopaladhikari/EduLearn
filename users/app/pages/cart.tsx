import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import type { MetaFunction } from "react-router";

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

export default function Cart() {
  return (
    <MaxWithWrapper as="section">
      <h1>Your Cart</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <CartItems />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </MaxWithWrapper>
  );
}

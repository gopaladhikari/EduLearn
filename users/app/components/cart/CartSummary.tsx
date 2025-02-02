import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartSummary() {
  const [promoCode, setPromoCode] = useState("");

  // This would typically come from a global state or API
  const subtotal = 269.97;
  const discount = 0;
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    // Here you would typically validate the promo code and apply the discount
    console.log("Applying promo code:", promoCode);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="mb-2"
        />
        <Button
          onClick={handleApplyPromo}
          variant="outline"
          className="w-full"
        >
          Apply Promo Code
        </Button>
      </div>
      <Button className="w-full">Proceed to Checkout</Button>
    </div>
  );
}

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";

interface CartItem {
  id: string;
  title: string;
  instructor: string;
  price: number;
  quantity: number;
  image: string;
}

const mockCart: CartItem[] = [
  {
    id: "1",
    title: "React.js Complete Guide for Beginners",
    instructor: "John Doe",
    price: 49.99,
    quantity: 1,
    image: "/images/course-1.jpg",
  },
  {
    id: "2",
    title: "Advanced Node.js Backend Development",
    instructor: "Jane Smith",
    price: 59.99,
    quantity: 1,
    image: "/images/course-2.jpg",
  },
];

export function meta() {
  return [
    {
      title: "Shopping Cart - Edulearn",
    },
    {
      name: "description",
      content:
        "Learn how to build a shopping cart with Next.js and Tailwind CSS.",
    },
  ];
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(mockCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  const applyCoupon = () => {
    if (coupon.trim()) {
      setCouponApplied(true);
    }
  };

  return (
    <>
      <section className="bg-linear-to-br from-primary/5 to-accent/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Shopping Cart
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {cart.length} {cart.length === 1 ? "course" : "courses"} in cart
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-6">
                      <div className="flex gap-6">
                        {/* Course Image */}
                        <div className="h-32 w-32 shrink-0 rounded-lg bg-muted">
                          <div className="flex h-full w-full items-center justify-center rounded-lg bg-linear-to-br from-primary/10 to-accent/10">
                            <span className="text-sm text-muted-foreground">
                              Image
                            </span>
                          </div>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1">
                          <h3 className="mb-1 text-lg font-bold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            by {item.instructor}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="rounded p-1 hover:bg-muted"
                              >
                                <Minus className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded p-1 hover:bg-muted"
                              >
                                <Plus className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-4 rounded p-2 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Your cart is empty
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Start adding courses to your cart!
                  </p>
                  <Link to="/">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Browse Courses
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-6">
                  <h3 className="mb-6 text-lg font-bold text-foreground">
                    Order Summary
                  </h3>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        disabled={couponApplied}
                      />
                      {!couponApplied && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={applyCoupon}
                          disabled={!coupon.trim()}
                        >
                          Apply
                        </Button>
                      )}
                      {couponApplied && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setCoupon("");
                            setCouponApplied(false);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    {couponApplied && (
                      <p className="mt-2 text-sm text-accent">
                        10% discount applied!
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="mb-6 space-y-3 border-b pb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-foreground">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Discount (10%):
                        </span>
                        <span className="text-accent">
                          -${discount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%):</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Button className="mb-3 w-full gap-2 bg-primary py-6 text-primary-foreground hover:bg-primary/90">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

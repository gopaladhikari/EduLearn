import type { Cart } from "@/types";
import { createContext, useMemo, useState } from "react";

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
});

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);

  const values = useMemo(() => {
    return {
      cart,
      setCart,
    };
  }, [cart]);

  return <CartContext value={values}>{children}</CartContext>;
}

export { CartProvider, CartContext };

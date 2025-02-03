import type { Cart } from "@/types";
import { createContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
  initalCart: Cart | null;
};

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  initalCart: Cart | null;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  initalCart: null,
});

function CartProvider({ children, initalCart }: Props) {
  const [cart, setCart] = useState<Cart | null>(initalCart);

  const values = useMemo(() => {
    return {
      cart,
      setCart,
      initalCart,
    };
  }, [cart, initalCart]);

  return <CartContext value={values}>{children}</CartContext>;
}

export { CartProvider, CartContext };

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunction,
} from "react-router";
import "./tailwind.css";
import { Header } from "./components/partials/Header";
import { Footer } from "./components/partials/Footer";
import {
  commitSession,
  destroySession,
  getSession,
} from "./lib/utils";
import type { Cart, User } from "./types";
import { axiosInstance } from "./config/axios";
import { useNavigation, data as res } from "react-router";
import { GlobalPendingUI } from "./components/skeletons/GlobalPendingUI";
import { CartProvider } from "./context/cartContext";
import { getCartItems, getMe } from "./lib/user";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("acessToken");

  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${token}`;
  try {
    const [user, cart] = await Promise.all([getMe(), getCartItems()]);

    if (user) session.set("user", user.data);

    return res(
      {
        user: user?.data,
        cart: cart?.data,
      },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  } catch (error) {
    const message = (error as Error).message;
    session.flash("error", message);

    return res(null, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};

export default function App() {
  const data = useLoaderData() as {
    user: User | null;
    cart: Cart | null;
  };

  const navigation = useNavigation();

  const isNavigating = navigation.state === "loading";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <CartProvider initalCart={data?.cart}>
          <Header user={data?.user} />
          {isNavigating ? (
            <GlobalPendingUI />
          ) : (
            <main>
              <Outlet />
            </main>
          )}
          <Footer />
        </CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

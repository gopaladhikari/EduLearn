import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data as res,
} from "react-router";
import "./tailwind.css";
import { Header } from "./components/partials/Header";
import { Footer } from "./components/partials/Footer";
import {
  commitSession,
  destroySession,
  getSession,
} from "./lib/utils";
import { axiosInstance } from "./config/axios";
import { CartProvider } from "./context/cartContext";
import { getCartItems, getMe } from "./lib/user";
import type { Route } from "./+types/root";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("acessToken");

  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${token}`;
  try {
    const [user, cart] = await Promise.all([getMe(), getCartItems()]);

    if (!user) throw new Error("User not found");

    session.set("user", user.data);

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
    return res(null, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
      status: 404,
    });
  }
};

export default function App({ loaderData }: Route.ComponentProps) {
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
        <CartProvider initalCart={loaderData?.cart || null}>
          <Header user={loaderData?.user || null} />

          <main>
            <Outlet />
          </main>
          <Footer />
        </CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

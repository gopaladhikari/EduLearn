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
import type { User } from "./types";
import { axiosInstance } from "./config/axios";
import { useNavigation, data as res } from "react-router";
import { GlobalPendingUI } from "./components/skeletons/GlobalPendingUI";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("acessToken");

  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${token}`;
  try {
    const { data } = await axiosInstance.get<User>("/api/users/me");

    session.set("user", data.data);

    return res(data.data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
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
  const user = useLoaderData<User | null>();
  const navigation = useNavigation();

  const isNavigating = Boolean(navigation.location);

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
        <Header user={user} />
        {isNavigating && <GlobalPendingUI />}
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

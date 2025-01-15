import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { Header } from "./components/partials/Header";
import { MaxWidthWrapper } from "./components/partials/MaxWidthWrapper";
import { themeCookie } from "./sessions.server";
import "./tailwind.css";
import Footer from "./components/partials/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const theme = request.headers.get("Cookie");

  const parseTheme = await themeCookie.parse(theme);

  return Response.json(
    { theme: parseTheme },
    {
      headers: {
        "Set-Cookie": await themeCookie.serialize(
          parseTheme ?? "dark"
        ),
      },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { theme } = Object.fromEntries(formData);

  return Response.json(
    { theme },
    {
      headers: {
        "Set-Cookie": await themeCookie.serialize(theme),
      },
    }
  );
};

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className={theme}>
        <Header />

        <main>
          <MaxWidthWrapper>
            <Outlet />
          </MaxWidthWrapper>
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

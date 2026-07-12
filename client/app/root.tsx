import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import { Footer } from "./components/footer";
import "./app.css";
import { GlobalError } from "./routes/error-boundary";
import { useAuthSync } from "./hooks/sync-auth";
import { Loading } from "./components/loading";
import { BackendStatusAlert } from "./components/backend-status-alert";

export function HydrateFallback() {
  return <Loading />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <main>{isLoading ? <Loading /> : children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useAuthSync();
  return (
    <>
      <BackendStatusAlert />
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  return <GlobalError />;
}

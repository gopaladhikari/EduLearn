import { ThemeProvider } from "@/context/ThemeContext";
import {
  createRootRouteWithContext,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type AuthContextType } from "@/context/AuthContext";
import { Footer } from "@/components/partials/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/partials/Header";

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: Root,
});

function Root() {
  return (
    <>
      <HeadContent />
      <ThemeProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Toaster />
        <Footer />
      </ThemeProvider>
      <Scripts />
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}

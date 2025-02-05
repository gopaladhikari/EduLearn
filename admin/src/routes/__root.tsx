import { ThemeProvider } from "@/context/ThemeContext";
import {
  createRootRouteWithContext,
  Outlet,
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
      <ThemeProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Toaster />
        <Footer />
      </ThemeProvider>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}

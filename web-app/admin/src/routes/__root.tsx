import { ThemeProvider } from "@/context/ThemeContext";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import type { AuthContextType } from "@/context/AuthContext";
import { Footer } from "@/components/partials/Footer";
import { NotFound } from "@/components/partials/NotFound";
import { ErrorPage } from "@/components/partials/Errorpage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: () => {
    return (
      <>
        <ThemeProvider>
          <Outlet />
          <Footer />
          <ScrollRestoration />

          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
        <TanStackRouterDevtools />
      </>
    );
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

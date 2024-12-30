import { ThemeProvider } from "@/context/ThemeContext";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AuthContextType } from "@/context/AuthContext";
import { Footer } from "@/components/partials/Footer";
import { NotFound } from "@/components/partials/NotFound";
import { ErrorPage } from "@/components/partials/Errorpage";

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: () => {
    return (
      <>
        <ThemeProvider>
          <Outlet />
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
        <TanStackRouterDevtools />
      </>
    );
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

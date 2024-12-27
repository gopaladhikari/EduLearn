import { ThemeProvider } from "@/context/ThemeContext";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

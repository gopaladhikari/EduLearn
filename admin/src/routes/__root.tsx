import { ThemeProvider } from "@/context/ThemeContext";
import {
  createRootRouteWithContext,
  Outlet,
  useLoaderData,
} from "@tanstack/react-router";
import { type AuthContextType } from "@/context/AuthContext";
import { Footer } from "@/components/partials/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/partials/Header";
import { me } from "@/lib/queries/users.query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: Root,
  loader: async () => {
    try {
      const { data } = await me();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

function Root() {
  const data = useLoaderData({ from: "__root__" });
  const { setUser } = useAuth();

  useEffect(() => {
    setUser(data);
  }, [data, setUser]);

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

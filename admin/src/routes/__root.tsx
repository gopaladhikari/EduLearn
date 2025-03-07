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
import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";
import { setUserStore } from "@/store/user-store";
import { useEffect } from "react";

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: Root,
  loader: async () => {
    try {
      const { data } = await axiosInstance.get<User>("/api/users/me");
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
});

function Root() {
  const data = Route.useLoaderData();

  useEffect(() => {
    if (data) setUserStore(data);
  }, [data]);

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

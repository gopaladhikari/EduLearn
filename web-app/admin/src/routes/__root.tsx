import { ThemeProvider } from "@/context/ThemeContext";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { type AuthContextType } from "@/context/AuthContext";
import { Footer } from "@/components/partials/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NotFound } from "@/components/partials/NotFound";
import { Header } from "@/components/partials/Header";
import { MainNav } from "@/components/dashboard/main-nav";
import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import Search from "@/components/dashboard/search";
import { ModeToggle } from "@/components/partials/mode-toggle";
import UserNav from "@/components/dashboard/user-nav";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: () => {
    return (
      <>
        <ThemeProvider>
          <Outlet />
          <Toaster />
          <Footer />
          <ScrollRestoration />
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ThemeProvider>
        {import.meta.env.DEV && <TanStackRouterDevtools />}
      </>
    );
  },
  notFoundComponent: () => {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    return (
      <>
        {isLoggedIn ? (
          <div className="border-b shadow-md">
            <MaxWithWrapper className="flex items-center gap-4">
              <strong className="text-2xl">
                <Link to="/dashboard" className="text-foreground">
                  E-learning
                </Link>
              </strong>
              <header>
                <MainNav className="mx-6" />
              </header>
              <div className="ml-auto flex items-center space-x-4">
                <Search />
                <ModeToggle />
                <UserNav />
              </div>
            </MaxWithWrapper>
          </div>
        ) : (
          <>
            <Header />
          </>
        )}
        <MaxWithWrapper className="space-y-3">
          <NotFound />
        </MaxWithWrapper>
      </>
    );
  },
});

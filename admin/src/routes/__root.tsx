import { ThemeProvider } from "@/context/ThemeContext";
import { Outlet, HeadContent, Scripts } from "@tanstack/react-router";
import { Footer } from "@/components/partials/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/partials/Header";
import { createRootRoute } from "@tanstack/react-router";
import { CookiesProvider } from "react-cookie";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <HeadContent />
      <ThemeProvider>
        <CookiesProvider></CookiesProvider>
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
    </>
  );
}

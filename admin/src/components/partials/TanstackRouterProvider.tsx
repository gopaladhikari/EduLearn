import { useAuth } from "@/hooks/useAuth";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  context: {
    isLoggedIn: undefined!,
    user: undefined!,
    setUser: undefined!,
  },
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function TanstackRouterProvider() {
  const auth = useAuth();

  return <RouterProvider router={router} context={auth} />;
}

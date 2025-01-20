import { useAuth } from "@/hooks/useAuth";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  context: {
    isLoggedIn: undefined!,
    user: undefined!,
    isPending: undefined!,
    setIsLoggedIn: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function TanstackRouterProvider() {
  const auth = useAuth();

  return <RouterProvider router={router} context={auth} />;
}

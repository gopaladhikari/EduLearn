import { useAuth } from "@/context/AuthContext";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  context: {
    isLoggedIn: undefined!,
    user: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function TanstackRouterProvider() {
  const { isLoggedIn, user } = useAuth();

  return (
    <RouterProvider router={router} context={{ isLoggedIn, user }} />
  );
}

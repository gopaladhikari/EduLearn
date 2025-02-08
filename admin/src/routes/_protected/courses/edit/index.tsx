import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/courses/edit/")({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({
      to: "/courses",
    });
  },
});

function RouteComponent() {
  return <div>Hello "/_protected/courses/edit/"!</div>;
}

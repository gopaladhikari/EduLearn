import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/customers")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Customer",
        },
        {
          name: "description",
          content: "Customers/Student's list of EduLearn platform",
        },
      ],
    };
  },
});

function RouteComponent() {
  return <div>Hello "/_protected/_dashboard/customers"!</div>;
}

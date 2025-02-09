import { useSeo } from "@/hooks/useSeo";
import { useCourseBySlug } from "@/lib/queries/courses.query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/courses/edit/$slug",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  const { data } = useCourseBySlug({
    slug,
  });

  useSeo({
    title: data?.title || "",
    description: data?.description,
  });

  return <div>{JSON.stringify(data)}</div>;
}

import { getCourseAnalyticsBySlug } from "@/lib/queries/courses.query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/analytics/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  const { isPending } = useQuery({
    queryKey: ["analytics", slug],
    queryFn: () => getCourseAnalyticsBySlug(slug),
  });

  return <div>{isPending ? "loading" : "loaded"} </div>;
}

import { getCourseAnalyticsBySlug } from "@/lib/queries/analytics.query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/analytics/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  const { data, isPending } = useQuery({
    queryKey: ["analytics", slug],
    queryFn: () => getCourseAnalyticsBySlug(slug),
  });

  return (
    <div>
      Hello "/_protected/analytics/$slug"{" "}
      {isPending ? "loading" : "loaded"}{" "}
    </div>
  );
}

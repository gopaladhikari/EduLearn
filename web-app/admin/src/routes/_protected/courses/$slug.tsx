import { CourseDetailPage } from "@/components/courses/Coursespage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/courses/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CourseDetailPage />
    </div>
  );
}

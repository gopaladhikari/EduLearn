import { EngagementMetrics } from "@/components/analytics/EngagementMetrics";
import { EnrollmentChart } from "@/components/analytics/EnrollmentChart";
import { FeedbackSection } from "@/components/analytics/FeedbackSection";
import { OverviewCards } from "@/components/analytics/OverviewCards";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { getCourseAnalyticsBySlug } from "@/lib/queries/analytics.query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/analytics/$slug")({
  component: RouteComponent,
});

const courseAnalytics = {
  courseSlug: "water-fall",
  totalEnrollments: 1000,
  totalClicks: 8,
  totalCompletions: 750,
  averageProgress: 75,
  activeUsers: 500,
  totalRevenue: 50000,
  discountedSales: 200,
  refunds: 10,
  averageRating: 4.5,
  totalReviews: 300,
  commonFeedback: [
    "Great course!",
    "Very informative",
    "Excellent instructor",
  ],
  mostViewedLesson: "Introduction to Waterfalls",
  dropOffPoint: "Advanced Techniques",
  totalWatchTime: 10000,
  popularityScore: 85,
  trendScore: 92,
};

export type CourseAnalytics = typeof courseAnalytics;

function RouteComponent() {
  const { slug } = Route.useParams();

  const { data } = useQuery({
    queryKey: ["analytics", slug],
    queryFn: () => getCourseAnalyticsBySlug(slug),
  });

  console.log(data);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Course Analytics: {courseAnalytics.courseSlug}
      </h1>
      <OverviewCards analytics={courseAnalytics} />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <EnrollmentChart analytics={courseAnalytics} />
        <RevenueChart analytics={courseAnalytics} />
      </div>
      <EngagementMetrics analytics={courseAnalytics} />
      <FeedbackSection analytics={courseAnalytics} />{" "}
    </div>
  );
}

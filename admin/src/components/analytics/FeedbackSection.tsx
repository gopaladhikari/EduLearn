import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CourseAnalytics } from "@/routes/_protected/analytics/$slug";

export const FeedbackSection = ({
  analytics,
}: {
  analytics: CourseAnalytics;
}) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>User Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="mb-2 text-lg font-semibold">
          Common Feedback:
        </h3>
        <ul className="mb-4 list-disc pl-5">
          {analytics.commonFeedback.map((feedback, index) => (
            <li key={index}>{feedback}</li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Reviews: {analytics.totalReviews}
            </p>
            <p className="text-sm text-muted-foreground">
              Average Rating: {analytics.averageRating.toFixed(1)} / 5
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Refunds: {analytics.refunds}
            </p>
            <p className="text-sm text-muted-foreground">
              Discounted Sales: {analytics.discountedSales}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

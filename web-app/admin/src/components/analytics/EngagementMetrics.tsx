import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";

export const EngagementMetrics = ({ analytics }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between">
              <span className="text-sm font-medium">
                Average Progress
              </span>
              <span className="text-sm font-medium">
                {analytics.averageProgress}%
              </span>
            </div>
            <Progress
              value={analytics.averageProgress}
              className="w-full"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between">
              <span className="text-sm font-medium">
                Popularity Score
              </span>
              <span className="text-sm font-medium">
                {analytics.popularityScore}%
              </span>
            </div>
            <Progress
              value={analytics.popularityScore}
              className="w-full"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between">
              <span className="text-sm font-medium">Trend Score</span>
              <span className="text-sm font-medium">
                {analytics.trendScore}%
              </span>
            </div>
            <Progress
              value={analytics.trendScore}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <p>
            <strong>Most Viewed Lesson:</strong>{" "}
            {analytics.mostViewedLesson}
          </p>
          <p>
            <strong>Drop-off Point:</strong> {analytics.dropOffPoint}
          </p>
          <p>
            <strong>Total Watch Time:</strong>{" "}
            {(analytics.totalWatchTime / 3600).toFixed(2)} hours
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

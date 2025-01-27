import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, DollarSign, BarChart2, Star } from "lucide-react";

export const OverviewCards = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Enrollments
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {analytics.totalEnrollments}
          </div>
          <p className="text-xs text-muted-foreground">
            +{analytics.totalEnrollments * 0.1} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${analytics.totalRevenue}
          </div>
          <p className="text-xs text-muted-foreground">
            +${analytics.totalRevenue * 0.05} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completion Rate
          </CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(
              (analytics.totalCompletions /
                analytics.totalEnrollments) *
              100
            ).toFixed(1)}
            %
          </div>
          <p className="text-xs text-muted-foreground">
            +2.5% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Rating
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {analytics.averageRating.toFixed(1)}
          </div>
          <p className="text-xs text-muted-foreground">
            Based on {analytics.totalReviews} reviews
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

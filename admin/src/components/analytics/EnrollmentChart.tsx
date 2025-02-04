import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CourseAnalytics } from "@/routes/_protected/analytics/$slug";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const EnrollmentChart = ({
  analytics,
}: {
  analytics: CourseAnalytics;
}) => {
  const data = [
    { name: "Jan", enrollments: 400 },
    { name: "Feb", enrollments: 500 },
    { name: "Mar", enrollments: 600 },
    { name: "Apr", enrollments: 800 },
    { name: "May", enrollments: 1000 },
    { name: "Jun", enrollments: analytics.totalEnrollments },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Enrollment Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

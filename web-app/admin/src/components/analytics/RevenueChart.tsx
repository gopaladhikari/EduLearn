import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const RevenueChart = ({ analytics }) => {
  const data = [
    { name: "Jan", revenue: 10000 },
    { name: "Feb", revenue: 15000 },
    { name: "Mar", revenue: 20000 },
    { name: "Apr", revenue: 30000 },
    { name: "May", revenue: 40000 },
    { name: "Jun", revenue: analytics.totalRevenue },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

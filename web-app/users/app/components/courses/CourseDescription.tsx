import { Course } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CourseDescription({ course }: { course: Course }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Course Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{course.description}</p>
      </CardContent>
    </Card>
  );
}

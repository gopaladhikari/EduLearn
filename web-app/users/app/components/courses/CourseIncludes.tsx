import { Course } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FileText, Award, Clock, Infinity } from "lucide-react";

export default function CourseIncludes({ course }: { course: Course }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>This Course Includes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <Video className="h-5 w-5 text-blue-500" />
            <span>{course.lessons.length} hours of video content</span>
          </li>
          <li className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span>Downloadable resources</span>
          </li>
          <li className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-500" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span>Lifetime access</span>
          </li>
          <li className="flex items-center space-x-2">
            <Infinity className="h-5 w-5 text-blue-500" />
            <span>Access on mobile and desktop</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

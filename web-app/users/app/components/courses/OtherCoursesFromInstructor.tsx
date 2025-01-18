import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";

// Mock function to get other courses from the instructor
const getOtherCoursesFromInstructor = (instructorId: string) => {
  // In a real application, you would fetch this data from your API
  return [
    {
      id: "1",
      title: "Advanced React Patterns",
      slug: "advanced-react-patterns",
    },
    { id: "2", title: "Node.js Masterclass", slug: "nodejs-masterclass" },
    { id: "3", title: "Full Stack Development with MERN", slug: "mern-stack" },
  ];
};

export default function OtherCoursesFromInstructor({
  instructors,
}: {
  instructors: User[];
}) {
  const otherCourses = getOtherCoursesFromInstructor(instructors[0]._id);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>More Courses by {instructors[0].fullName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {otherCourses.map((course) => (
            <li key={course.id}>
              <Link
                to={`/courses/${course.slug}`}
                className="text-blue-500 hover:underline"
              >
                {course.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

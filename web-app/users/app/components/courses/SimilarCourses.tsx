import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
export enum CourseCategory {
  // Add your course categories here
  PROGRAMMING = "PROGRAMMING",
  DESIGN = "DESIGN",
  BUSINESS = "BUSINESS",
  // ... add more as needed
}

// Mock function to get similar courses
const getSimilarCourses = (category: CourseCategory) => {
  // In a real application, you would fetch this data from your API
  return [
    { id: "1", title: "Introduction to React", slug: "intro-to-react" },
    { id: "2", title: "Advanced JavaScript Concepts", slug: "advanced-js" },
    { id: "3", title: "Building RESTful APIs", slug: "restful-apis" },
  ];
};

export default function SimilarCourses({
  category,
}: {
  category: CourseCategory;
}) {
  const similarCourses = getSimilarCourses(category);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Similar Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {similarCourses.map((course) => (
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

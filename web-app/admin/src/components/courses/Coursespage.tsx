import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  DollarSign,
  BookOpen,
  Tag,
  Trophy,
  TrendingUp,
} from "lucide-react";

const course = {
  id: "1",
  title: "Advanced Web Development",
  description:
    "Master the latest web technologies and frameworks in this comprehensive course.",
  instructor: [{ name: "Jane Doe", avatar: "/avatars/jane-doe.jpg" }],
  uploadedBy: { name: "John Smith" },
  lessons: [
    "HTML & CSS Basics",
    "JavaScript Fundamentals",
    "React Essentials",
    "Backend with Node.js",
    "Database Integration",
  ],
  category: "Web Development",
  tags: ["JavaScript", "React", "Node.js", "MongoDB"],
  price: 99.99,
  isPopular: true,
  isBestSeller: true,
  video: "https://example.com/course-preview.mp4",
};

export function CourseDetailPage() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">
            {course.title}
          </CardTitle>
          <div className="flex gap-2">
            {course.isPopular && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <TrendingUp className="h-4 w-4" /> Popular
              </Badge>
            )}
            {course.isBestSeller && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Trophy className="h-4 w-4" /> Bestseller
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="mt-2 text-primary-foreground/80">
          {course.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold">
              About This Course
            </h2>
            <p className="text-muted-foreground">
              {course.description}
            </p>
            <Separator className="my-6" />
            <h3 className="mb-4 text-xl font-semibold">
              What You'll Learn
            </h3>
            <ul className="list-disc space-y-2 pl-5">
              {course.lessons.map((lesson, index) => (
                <li key={index} className="text-muted-foreground">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Instructor: {course.instructor[0].name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span>Price: ${course.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>{course.lessons.length} lessons</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <h3 className="mb-4 text-xl font-semibold">Course Preview</h3>
        <div className="aspect-video">
          <video
            src={course.video}
            controls
            poster="/course-thumbnail.jpg"
            className="h-full w-full rounded-lg object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
}

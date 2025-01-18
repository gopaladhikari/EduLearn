import { useState } from "react";
import type { CourseWithInstructors } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle, Clock } from "lucide-react";

const course = {
  _id: "1",
  title: "Introduction to React",
  description: "Learn the basics of React and build your first application.",
  slug: "slug",
  instructor: [
    {
      _id: "101",
      name: "John Doe",
      title: "Senior React Developer",
      avatar: "/placeholder.svg",
      bio: "John has been developing with React for over 5 years and loves teaching others.",
    },
  ],
  uploadedBy: {
    _id: "101",
    name: "John Doe",
    title: "Senior React Developer",
    avatar: "/placeholder.svg",
    bio: "John has been developing with React for over 5 years and loves teaching others.",
  },
  lessons: [
    "Introduction to React",
    "Components and Props",
    "State and Lifecycle",
    "Hooks",
  ],
  isPublished: true,
  thumbnail: "/placeholder.svg",
  category: "PROGRAMMING",
  tags: ["react", "javascript", "frontend"],
  price: 49.99,
  isPopular: true,
  isBestSeller: false,
  video: {
    url: "https://example.com/intro-to-react.mp4",
    publicId: "intro-to-react",
  },
  averageRating: 4.5,
  totalReviews: 120,
};

export default function CourseContent({
  course: Hello,
}: {
  course: CourseWithInstructors;
}) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={expandedSections}
          onValueChange={setExpandedSections}
        >
          {course.lessons.map((lesson, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger>
                Section {index + 1}: {lesson}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PlayCircle className="h-4 w-4 text-blue-500" />
                      <span>Lesson 1: Introduction</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>10:00</span>
                    </div>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

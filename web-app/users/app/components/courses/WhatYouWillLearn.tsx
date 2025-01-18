import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function WhatYouWillLearn() {
  const learningPoints = [
    "Master the fundamentals of the course topic",
    "Apply practical skills to real-world scenarios",
    "Develop problem-solving abilities in the field",
    "Gain confidence in using industry-standard tools",
    "Understand best practices and common pitfalls",
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>What You'll Learn</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {learningPoints.map((point, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

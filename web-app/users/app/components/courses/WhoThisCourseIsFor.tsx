import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function WhoThisCourseIsFor() {
  const targetAudience = [
    "Beginners looking to start their journey in the field",
    "Intermediate learners wanting to expand their knowledge",
    "Professionals seeking to update their skills",
    "Anyone interested in practical, hands-on learning",
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Who This Course Is For</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {targetAudience.map((audience, index) => (
            <li key={index} className="flex items-start space-x-2">
              <User className="mt-1 h-5 w-5 text-blue-500" />
              <span>{audience}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Prerequisites() {
  const prerequisites = [
    "Basic understanding of programming concepts",
    "Familiarity with JavaScript",
    "A computer with internet access",
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Prerequisites</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {prerequisites.map((prerequisite, index) => (
            <li key={index} className="flex items-start space-x-2">
              <AlertCircle className="mt-1 h-5 w-5 text-yellow-500" />
              <span>{prerequisite}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

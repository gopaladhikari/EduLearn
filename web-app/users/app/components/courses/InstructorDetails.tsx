import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function InstructorDetails({
  instructors,
}: {
  instructors: User[];
}) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          Meet Your Instructor{instructors.length > 1 ? "s" : ""}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

// <CardContent>
// {instructors.map((instructor) => (
//   <div key={instructor._id} className="mb-4 flex items-start space-x-4">
//     <Avatar className="h-16 w-16">
//       <AvatarImage src={instructor?.avatar} alt={instructor.name} />
//       <AvatarFallback>{instructor?.fullName.charAt(0)}</AvatarFallback>
//     </Avatar>
//     <div>
//       <h3 className="text-lg font-semibold">{instructor.name}</h3>
//       <p className="text-sm text-gray-500">{instructor.title}</p>
//       <p className="mt-2">{instructor.bio}</p>
//     </div>
//   </div>
// ))}
// </CardContent>

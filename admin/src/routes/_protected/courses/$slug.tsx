import { getCourseBySlug } from "@/lib/queries/courses.query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
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
import { CourseDetailPageSkeleton } from "@/components/skeletons/CourseDetailPageSkeleton";
import { useSeo } from "@/hooks/useSeo";

export const Route = createFileRoute("/_protected/courses/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  const { data, isPending } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  useSeo({
    title: data?.data.title || "",
    description: data?.data.description,
  });

  if (isPending) return <CourseDetailPageSkeleton />;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">
            {data?.data.title}
          </CardTitle>
          <div className="flex gap-2">
            {data?.data.isPopular && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <TrendingUp className="h-4 w-4" /> Popular
              </Badge>
            )}
            {data?.data.isBestSeller && (
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
          {data?.data.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold">
              About This Course
            </h2>
            <p className="text-muted-foreground">
              {data?.data.description}
            </p>
            <Separator className="my-6" />
            <h3 className="mb-4 text-xl font-semibold">
              What You'll Learn
            </h3>
            {/* <ul className="list-disc space-y-2 pl-5">
              {course.lessons.map((lesson, index) => (
                <li key={index} className="text-muted-foreground">
                  {lesson}
                </li>
              ))}
            </ul> */}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  {/* <span>Instructor: {course.instructor[0].name}</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span>Price: ${data?.data.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  {/* <span>{course.lessons.length} lessons</span> */}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data?.data.tags.map((tag) => (
                    <Badge
                      key={tag}
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
                <Button className="w-full">
                  <Link
                    to="/analytics/$slug"
                    params={{
                      slug: data?.data.slug as string,
                    }}
                  >
                    View Analytics
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <h3 className="mb-4 text-xl font-semibold">Course Preview</h3>
        <div className="aspect-video">
          <video
            src={data?.data.video?.url}
            controls
            className="h-full w-full rounded-lg object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
}

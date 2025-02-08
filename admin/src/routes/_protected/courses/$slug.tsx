import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
  Edit2,
} from "lucide-react";
import { CourseDetailPageSkeleton } from "@/components/skeletons/CourseDetailPageSkeleton";
import { useSeo } from "@/hooks/useSeo";
import { ReactParser } from "@/components/courses/ReactParser";
import { cn } from "@/lib/utils";
import { useGetCourseBySlug } from "@/hooks/coursesHooks";

export const Route = createFileRoute("/_protected/courses/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  const { data, isPending } = useGetCourseBySlug({
    slug,
  });

  useSeo({
    title: data?.title || "",
    description: data?.description,
  });

  if (isPending) return <CourseDetailPageSkeleton />;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">
            {data?.title}
          </CardTitle>
          <div className="flex gap-2">
            {data?.isPopular && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <TrendingUp className="h-4 w-4" /> Popular
              </Badge>
            )}
            {data?.isBestSeller && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Trophy className="h-4 w-4" /> Bestseller
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold">
              About This Course
            </h2>
            <CardDescription className="prose dark:prose-invert max-w-full text-black dark:text-white">
              <ReactParser html={data?.description as string} />
            </CardDescription>
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
                  <User className="text-muted-foreground h-5 w-5" />
                  <span>
                    Instructor:{" "}
                    {data?.instructor
                      .map(({ fullName }) => fullName)
                      .join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="text-muted-foreground h-5 w-5" />
                  <span>Price: ${data?.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-muted-foreground h-5 w-5" />
                  <span>{data?.lessons.length} lessons</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data?.tags.map((tag) => (
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
              <CardFooter className="flex-col gap-4">
                <Link
                  to="/courses/edit/$slug"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full",
                  )}
                  params={{
                    slug: data?.slug as string,
                  }}
                >
                  Edit <Edit2 />
                </Link>
                <Link
                  to="/analytics/$slug"
                  className={cn(buttonVariants(), "w-full")}
                  params={{
                    slug: data?.slug as string,
                  }}
                >
                  View Analytics
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <h3 className="mb-4 text-xl font-semibold">Course Preview</h3>
        <div className="aspect-video">
          <video
            src={data?.video?.url}
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

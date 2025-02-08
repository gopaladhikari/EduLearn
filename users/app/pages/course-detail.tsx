import { axiosInstance } from "@/config/axios";
import type { CourseWithInstructors } from "@/types";
import type { Route } from "./+types/course-detail";
import parser from "html-react-parser";
import {
  TrendingUp,
  User,
  DollarSign,
  BookOpen,
  Tag,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MaxWithWrapper } from "@/components/partials/MaxWidthWrapper";
import { data as response } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {
  try {
    const { data } = await axiosInstance.get<CourseWithInstructors>(
      `/api/courses/${params.slug}`,
    );

    return response(data.data, {
      headers: {
        "Cache-control":
          "public, max-age=900, must-revalidate, immutable",
      },
    });
  } catch (error) {
    return null;
  }
};

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: data?.title,
      description:
        data?.description ??
        "Learn about the course detail page and its features. Explore the page to see how it works.",
    },
    {
      name: "og:title",
      content: data?.title ?? "Course Detail | EduLearn",
    },
    {
      name: "og:description",
      content:
        data?.description ??
        "Learn about the course detail page and its features. Explore the page to see how it works.",
    },
  ];
};

export default function CoureseDetail({
  loaderData,
}: Route.ComponentProps) {
  const parsedDescription = parser(String(loaderData?.description));

  return (
    <MaxWithWrapper>
      <Card className="border-none">
        <CardHeader className="bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">
              {loaderData?.title}
            </CardTitle>
            <div className="flex gap-2">
              {loaderData?.isPopular && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <TrendingUp className="h-4 w-4" /> Popular
                </Badge>
              )}
              {loaderData?.isBestSeller && (
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
                {parsedDescription}
              </CardDescription>
              <Separator className="my-6" />
              <h3 className="mb-4 text-xl font-semibold">
                What You&apos;ll Learn
              </h3>
            </div>
            <div>
              <figure>
                <img
                  src={loaderData?.thumbnail?.url}
                  alt={loaderData?.title}
                  className="aspect-3/2 rounded-t-lg object-cover"
                />
              </figure>
              <Card className="rounded-t-none">
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="text-muted-foreground h-5 w-5" />
                    <span>
                      Instructor: {loaderData?.instructor[0].fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-muted-foreground h-5 w-5" />
                    <span>
                      Price: ${loaderData?.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-muted-foreground h-5 w-5" />
                    <span>{loaderData?.lessons.length} lessons</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {loaderData?.tags.map((tag) => (
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
              </Card>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <h3 className="mb-4 text-xl font-semibold">
            Course Preview
          </h3>
          <div className="aspect-video">
            <video
              src={loaderData?.video?.url}
              controls
              className="h-full w-full rounded-lg object-cover"
            >
              <track
                kind="captions"
                srcLang="en"
                src=""
                label="English"
                default
              />
              <p>
                Your browser does not support the video tag. Here is a{" "}
                <a href={loaderData?.video?.url}>link to the video</a>{" "}
                instead.
              </p>
            </video>
          </div>
        </CardContent>
      </Card>
    </MaxWithWrapper>
  );
}

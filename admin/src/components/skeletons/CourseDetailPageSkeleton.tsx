import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CourseDetailPageSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Header Skeleton */}
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <Skeleton className="mt-2 h-6 w-1/3" />
      </CardHeader>

      {/* Main Content Skeleton */}
      <CardContent className="mt-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Section Skeleton */}
          <div className="space-y-6 md:col-span-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
            <Separator className="my-6" />
            <Skeleton className="h-5 w-1/2" />
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </ul>
          </div>

          {/* Right Section Skeleton */}
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-3/4" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3].map((_, index) => (
                    <Skeleton key={index} className="h-8 w-16" />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>

      {/* Course Preview Skeleton */}
      <CardContent>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="mt-4 aspect-video rounded-lg" />
      </CardContent>
    </Card>
  );
}

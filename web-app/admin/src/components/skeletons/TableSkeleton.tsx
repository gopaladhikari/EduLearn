import type { ComponentProps } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type TableSkeletonProps = ComponentProps<"div"> & {
  page?: number;
};

export function TableSkeleton({
  page = 10,
  className,
  ...rest
}: TableSkeletonProps) {
  const length = page * 1.5;

  return (
    <div className={cn("space-y-3", className)} {...rest}>
      <div
        className="mt-8 grid w-full items-center gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        }}
      >
        <Skeleton className="h-2 w-24" />
        <Skeleton className="h-2 w-24" />
        <Skeleton className="h-2 w-24" />
        <Skeleton className="h-2 w-24" />
        <Skeleton className="h-2 w-24" />
      </div>

      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="grid w-full items-center gap-8 space-y-1"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(100px, 1fr))",
          }}
        >
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

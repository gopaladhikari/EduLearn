import { Skeleton } from "../ui/skeleton";

interface TableSkeletonProps {
  page?: number;
}

export function TableSkeleton({ page = 10 }: TableSkeletonProps) {
  return (
    <div className="mt-4 flex flex-col space-y-3">
      <div
        className="grid w-full items-center gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}
      >
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>

      {Array.from({ length: page }).map((_, index) => (
        <div
          key={index}
          className="grid w-full items-center gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          }}
        >
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

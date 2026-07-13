import { Skeleton } from "~/components/ui/skeleton";

export function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>

              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-5">
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="space-y-4 p-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>

              <div className="flex gap-3">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

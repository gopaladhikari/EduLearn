import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Course } from "@/types";
import type { Table } from "@tanstack/react-table";

export function PaginationControls({
  table,
}: {
  table: Table<Course>;
}) {
  const totalPages = table.getPageCount();

  return (
    <Pagination>
      <PaginationContent className="ml-auto">
        <PaginationItem
          onClick={() => table?.previousPage()}
          aria-disabled={!table?.getCanPreviousPage()}
          className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
        >
          <PaginationPrevious />
        </PaginationItem>

        {totalPages > 7 ? (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <>
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => table?.setPageIndex(i)}
                    aria-current={
                      i === table?.getState().pagination.pageIndex
                    }
                    className="cursor-pointer aria-[current='true']:bg-secondary"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem
              onClick={() => table?.setPageIndex(totalPages)}
            >
              <PaginationLink className="cursor-pointer">
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : (
          <>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => table?.setPageIndex(i)}
                  aria-current={
                    i === table?.getState().pagination.pageIndex
                  }
                  className="cursor-pointer aria-[current='true']:bg-secondary"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
        )}

        <PaginationItem
          onClick={() => table?.nextPage()}
          aria-disabled={!table?.getCanNextPage()}
          className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

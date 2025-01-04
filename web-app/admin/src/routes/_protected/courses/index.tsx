import { getAllCourses } from "@/lib/queries/courses.query";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, PlusCircle, Search } from "lucide-react";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";
import { PaginationControls } from "@/components/courses/PaginationControls";
import { useCoursesTable } from "@/hooks/useCoursesTable";

export const Route = createFileRoute("/_protected/courses/")({
  component: RouteComponent,
});

const itemsPerPageArray = [10, 20, 30, 40, 50, 100];

function RouteComponent() {
  const itemsPerPage = sessionStorage.getItem("itemsPerPage") || "10";

  const navigate = useNavigate();

  useSeo({
    title: "Courses",
    description: "Courses",
  });

  const { data, isPending } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    staleTime: 1000 * 60 * 15,
  });

  const { table } = useCoursesTable(
    data?.data,
    parseInt(itemsPerPage),
  );

  return (
    <>
      <section className="flex items-center justify-between py-4">
        <div className="flex w-1/3 items-center gap-4 rounded-md border-2 px-4 py-2 focus-within:border-primary">
          <Search size={18} />
          <input
            id="filter-courses"
            placeholder="Filter courses..."
            value={
              (table
                .getColumn("title")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("title")
                ?.setFilterValue(event.target.value)
            }
            className="bg-transparent placeholder:text-sm focus:outline-none group-active:border-primary"
          />
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/courses/add",
            })
          }
        >
          <PlusCircle size={20} />
          Add Course
        </Button>
      </section>
      {isPending ? (
        <TableSkeleton page={parseInt(itemsPerPage) * 1.5} />
      ) : (
        <section className={"min-h-[407px]"}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            className="flex items-center gap-3"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.id !== "edit" && (
                              <>
                                {table.getState().sorting[0]?.id ===
                                header.id ? (
                                  <ArrowDown size={16} />
                                ) : (
                                  <ArrowUp size={16} />
                                )}
                              </>
                            )}
                          </button>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === "title" ? (
                          <Link
                            to={`/courses/$slug`}
                            params={{
                              slug: cell.row.original.slug,
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Link>
                        ) : (
                          <>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="h-[240px] text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      )}
      <div className="flex items-start justify-between gap-4">
        <Select
          onValueChange={(value) => {
            sessionStorage.setItem("itemsPerPage", value);
            table.setPageSize(parseInt(value));
          }}
          defaultValue={String(table.getState().pagination.pageSize)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items per page</SelectLabel>
              {itemsPerPageArray.map((item) => (
                <SelectItem key={item} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <PaginationControls table={table} />
      </div>
    </>
  );
}

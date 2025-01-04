import { getAllCourses } from "@/lib/queries/courses.query";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Course } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Menu,
  PlusCircle,
  Search,
} from "lucide-react";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";

export const Route = createFileRoute("/_protected/courses/")({
  component: RouteComponent,
});

const itemsPerPageArray = [10, 20, 30, 40, 50, 100];

function RouteComponent() {
  const coulmnHelper = createColumnHelper<Course>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const itemsPerPage = sessionStorage.getItem("itemsPerPage") || "10";

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: parseInt(itemsPerPage),
  });

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

  const columnDefs = useMemo(() => {
    return [
      coulmnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created At",
        cell: (info) => {
          const data = info.getValue() as string;
          const date = format(data, "dd/MM/yyyy");
          return date.toString();
        },
      }),
      coulmnHelper.accessor("title", {
        id: "title",
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      coulmnHelper.accessor("category", {
        id: "category",
        header: "Category",
        cell: (info) => info.getValue(),
      }),
      coulmnHelper.accessor("isPublished", {
        id: "isPublished",
        header: "Is Published",
        cell: (info) => {
          return info.getValue() ? "Yes" : "No";
        },
      }),
      coulmnHelper.accessor("price", {
        id: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      }),
      // @ts-expect-error no Error
      coulmnHelper.accessor("edit", {
        id: "edit",
        header: "",
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="cursor-pointer">
                  <Menu size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Edit</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="flex cursor-pointer justify-between"
                  >
                    <Label
                      htmlFor="publish-course"
                      className="cursor-pointer"
                    >
                      Publish
                    </Label>
                    <Switch
                      id="publish-course"
                      onCheckedChange={(checked) =>
                        console.log(checked)
                      }
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      }),
    ];
  }, [coulmnHelper]);

  const table = useReactTable({
    data: data?.data || [],
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: parseInt(itemsPerPage),
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const totalPages = table.getPageCount();

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
                  <TableCell
                    colSpan={columnDefs?.length}
                    className="h-[240px] text-center"
                  >
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
      </div>
    </>
  );
}

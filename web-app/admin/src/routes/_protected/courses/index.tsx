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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  PlusCircle,
  Search,
  Trash,
} from "lucide-react";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";
import { PaginationControls } from "@/components/courses/PaginationControls";
import { useCoursesTable } from "@/hooks/useCoursesTable";
import { SessionStorage } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { deleteManyCourses } from "@/lib/mutations/courses.mutation";
import type { Course } from "@/types";

export const Route = createFileRoute("/_protected/courses/")({
  component: RouteComponent,
});

type CachedCourses = {
  data: Course[];
};

const itemsPerPageArray = [10, 20, 30, 40, 50, 100];

function RouteComponent() {
  const itemsPerPage =
    Number(sessionStorage.getItem(SessionStorage.Items_Per_Page)) ||
    10;

  const navigate = useNavigate();

  useSeo({
    title: "Courses",
    description: "Courses",
  });

  const { table, isPending } = useCoursesTable(itemsPerPage);

  const tableRowCount =
    Number(sessionStorage.getItem(SessionStorage.Table_Row_Count)) ||
    itemsPerPage;

  const selectedCourses = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  const { mutate } = useMutation({
    mutationKey: ["deleteManyCourses"],
    mutationFn: (ids: string[]) => deleteManyCourses(ids),
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries({
        queryKey: ["courses"],
      });
      const oldCourses = queryClient.getQueriesData({
        queryKey: ["courses"],
      });

      const { data } = oldCourses[0][1] as CachedCourses;
      const newCourses = data.filter(
        (course) => !ids.includes(course._id),
      );

      queryClient.setQueryData(["courses"], {
        data: newCourses,
      });

      return data;
    },
    onError: (_error, _ids, courses) => {
      queryClient.setQueryData(["courses"], {
        data: courses,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });

  return (
    <>
      <h1 className="text-xl font-bold">All Courses</h1>
      <section className="flex items-center gap-6">
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

        {selectedCourses.length > 0 && (
          <div>
            <Dialog>
              <DialogTrigger asChild className="w-full">
                <button className="text-destructive" type="button">
                  <Trash size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="border-destructive/20 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete Course</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you
                    want to delete this course?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-6">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => mutate(selectedCourses)}
                    >
                      Continue
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <Button
          className="ml-auto"
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
        <TableSkeleton
          page={tableRowCount}
          className="mt-72 min-h-[407px]"
        />
      ) : (
        <section className="min-h-[407px]">
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
                                {header.id !== "select" && (
                                  <>
                                    {table.getState().sorting[0]
                                      ?.id === header.id ? (
                                      <ArrowDown size={16} />
                                    ) : (
                                      <ArrowUp size={16} />
                                    )}
                                  </>
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
                    className="mt-4 h-[240px] text-center"
                    colSpan={7}
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
        <PaginationControls table={table} />
      </div>
    </>
  );
}

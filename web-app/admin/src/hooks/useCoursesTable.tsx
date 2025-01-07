import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import type { Course } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LocalStorage, SessionStorage } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";
import {
  deleteCourse,
  togglePublishCourse,
} from "@/lib/mutations/courses.mutation";
import { queryClient } from "@/main";

type CachedCourses = {
  data: Course[];
};

export function useCoursesTable(
  data: Course[] | undefined,
  itemsPerPage: number,
) {
  const columnHelper = useMemo(
    () => createColumnHelper<Course>(),
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: itemsPerPage,
  });

  const { mutate: publishCourse } = useMutation({
    mutationKey: ["publishCourse"],
    mutationFn: (id: string) => togglePublishCourse(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });

  const { mutate: deleteCourseMutation } = useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: (id: string) => deleteCourse(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["courses"],
      });
      const oldCourses = queryClient.getQueriesData({
        queryKey: ["courses"],
      });

      const { data } = oldCourses[0][1] as CachedCourses;
      const newCourses = data.filter((course) => course._id !== id);

      queryClient.setQueryData(["courses"], {
        data: newCourses,
      });

      return data;
    },
    onError: (_error, _id, courses) => {
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

  const columns = useMemo(
    () => [
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created At",
        cell: (info) => {
          const date = format(
            new Date(info.getValue() as string),
            "dd/MM/yyyy",
          );
          return date;
        },
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("category", {
        id: "category",
        header: "Category",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("isPublished", {
        id: "isPublished",
        header: "Is Published",
        cell: (info) => (info.getValue() ? "Yes" : "No"),
      }),
      columnHelper.accessor("price", {
        id: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      }),
      {
        id: "edit",
        cell: (info: CellContext<Course, string>) => {
          const dontAskAgain =
            localStorage.getItem(LocalStorage.DONT_ASK_AGAIN) ===
            "true";

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="cursor-pointer">
                  <Menu size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuLabel>Edit</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex cursor-pointer justify-between"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Label
                      htmlFor="publish-course"
                      className="cursor-pointer"
                    >
                      Publish
                    </Label>
                    <Switch
                      id="publish-course"
                      defaultChecked={info.row.original.isPublished}
                      onCheckedChange={(checked) => {
                        if (checked)
                          localStorage.setItem(
                            LocalStorage.DONT_ASK_AGAIN,
                            "true",
                          );
                        else {
                          localStorage.removeItem(
                            LocalStorage.DONT_ASK_AGAIN,
                          );
                          publishCourse(info.row.original._id);
                        }
                        publishCourse(info.row.original._id);
                      }}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    {dontAskAgain ? (
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => {
                          deleteCourseMutation(info.row.original._id);
                        }}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild className="w-full">
                          <Button variant="destructive">
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="border-destructive/20 sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Delete Course</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. Are you
                              sure you want to delete this course?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="delete-course"
                              name="delete-course"
                              onCheckedChange={(checked) => {
                                if (checked)
                                  localStorage.setItem(
                                    LocalStorage.DONT_ASK_AGAIN,
                                    "true",
                                  );
                                else
                                  localStorage.removeItem(
                                    LocalStorage.DONT_ASK_AGAIN,
                                  );
                              }}
                            />
                            <Label
                              className="text-sm"
                              id="delete-course"
                            >
                              Don't ask me again
                            </Label>
                          </div>

                          <DialogFooter className="gap-6">
                            <DialogClose asChild>
                              <Button type="button" variant="outline">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              type="button"
                              onClick={() => {
                                deleteCourseMutation(
                                  info.row.original._id,
                                );
                              }}
                            >
                              Continue
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [columnHelper, deleteCourseMutation, publishCourse],
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
  });

  const tableRowCount = table.getRowCount();

  sessionStorage.setItem(
    SessionStorage.Table_Row_Count,
    String(tableRowCount),
  );

  return { table, setGlobalFilter };
}

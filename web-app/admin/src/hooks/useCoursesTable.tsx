import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
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

export function useCoursesTable(
  data: Course[] | undefined,
  itemsPerPage: number,
) {
  const columnHelper = createColumnHelper<Course>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: itemsPerPage,
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
                    <Dialog>
                      <DialogTrigger asChild className="w-full">
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="border-destructive/20 sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Course</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. Are you sure
                            you want to delete this course?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="delete-course"
                            name="delete-course"
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
                          <Button type="button">Continue</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return { table, setGlobalFilter };
}

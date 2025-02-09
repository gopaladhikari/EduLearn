import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLProps,
} from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { format } from "date-fns";
import type { Course } from "@/types";
import { Label } from "@/components/ui/label";
import { SessionStorage } from "@/config/constants";
import { CourseEditOption } from "@/components/courses/CourseEditOption";
import { useAllCourses } from "@/lib/queries/courses.query";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " accent-primary cursor-pointer"}
      {...rest}
    />
  );
}

export function useCoursesTable(itemsPerPage: number) {
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

  const { data, isPending } = useAllCourses();
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: { table: Table<Course> }) => (
          <div className="flex items-center gap-3">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
                id: "select-all",
              }}
            />
            <Label htmlFor="select-all" className="cursor-pointer">
              Select All
            </Label>
          </div>
        ),
        cell: ({ row }: { row: Row<Course> }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
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
          return <CourseEditOption info={info} />;
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

  if (!isPending)
    sessionStorage.setItem(
      SessionStorage.Table_Row_Count,
      String(tableRowCount),
    );

  return { table, setGlobalFilter, isPending };
}

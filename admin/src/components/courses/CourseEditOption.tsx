import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { Menu } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LocalStorage } from "@/config/constants";
import type { CellContext } from "@tanstack/react-table";
import type { Course } from "@/types";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  deleteCourse,
  togglePublishCourse,
} from "@/lib/mutations/courses.mutation";
import { queryClient } from "@/main";
import { Checkbox } from "../ui/checkbox";
import { memo } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  info: CellContext<Course, string>;
};

type CachedCourses = {
  data: Course[];
};

function Options({ info }: Props) {
  const dontAskAgain =
    localStorage.getItem(LocalStorage.DONT_ASK_AGAIN) === "true";

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
        <DropdownMenuItem>
          <Link
            to="/courses/edit/$slug"
            params={{ slug: info.row.original.slug }}
            className="w-full"
          >
            Edit
          </Link>
        </DropdownMenuItem>
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
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent className="border-destructive/20 sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete Course</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure you
                      want to delete this course?
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
                    <Label className="text-sm" id="delete-course">
                      Don't ask me again
                    </Label>
                  </div>

                  <DialogFooter className="gap-6">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => {
                          deleteCourseMutation(info.row.original._id);
                        }}
                      >
                        Continue
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const CourseEditOption = memo(Options);

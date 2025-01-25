import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Card } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { avatarSchema } from "@/schemas/user.schema";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { useState } from "react";
import { CloudUpload, Paperclip } from "lucide-react";
import type { DropzoneOptions } from "react-dropzone";
import { toast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { updateAvatarMutation } from "@/lib/mutations/user.mutation";

export function AvatarForm() {
  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
  });
  const [files, setFiles] = useState<File[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { user, setUser } = useAuth();

  const dropZoneConfig: DropzoneOptions = {
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateAvatarMutation,
    onSuccess: (data) => {
      setFiles(null);
      setImageUrl("");
      form.clearErrors();
      form.resetField("avatar");
      setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          avatar: {
            url: data.data.avatar.url,
            publicId: data.data.avatar.publicId,
          },
        };
      });
      toast({
        title: data.message,
        variant: "success",
      });
    },

    onError: async (error) => {
      toast({
        title: error.message,
        description: "Something went wrong",
        variant: "destructive",
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof avatarSchema>
  > = async (formData) => {
    mutate(formData);
  };

  return (
    <Card className="bg-background/50 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem>
                <FormLabel className="text-xl">
                  <div className="flex items-start justify-between">
                    <strong>Avatar</strong>
                    <img
                      src={user?.avatar.url}
                      alt={user?.fullName}
                      height={60}
                      width={60}
                      title={user?.fullName}
                      className="rounded-full object-cover"
                    />
                  </div>
                </FormLabel>
                <FormDescription>
                  Upload a profile picture for your account.
                </FormDescription>

                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={(e) => {
                      if (!e) return;

                      const file = e[0];

                      if (file) {
                        const url = URL.createObjectURL(file);
                        setImageUrl(url);
                      }

                      form.setValue("avatar", file);

                      setFiles(e);
                    }}
                    dropzoneOptions={dropZoneConfig}
                    className="relative w-full rounded-lg bg-background p-2"
                  >
                    <FileInput id="fileInput">
                      {files && files?.length > 0 ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          width={120}
                          height={120}
                        />
                      ) : (
                        <div className="flex w-full flex-col items-center justify-center p-8 outline-dashed outline-1 outline-slate-500">
                          <CloudUpload className="h-10 w-10 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      )}
                    </FileInput>
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

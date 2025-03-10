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
import { CloudUpload, Paperclip, User } from "lucide-react";
import type { DropzoneOptions } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMe } from "@/store/user-store";

export function AvatarForm() {
  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
  });
  const [files, setFiles] = useState<File[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const user = useMe();

  const dropZoneConfig: DropzoneOptions = {
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const onSubmit: SubmitHandler<
    z.infer<typeof avatarSchema>
  > = async (formData) => {
    console.log(formData);
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
                    <Avatar className="h-14 w-14 cursor-pointer">
                      <AvatarImage src={user?.avatar?.url} />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
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
                    className="bg-background relative w-full rounded-lg p-2"
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
                        <div className="flex w-full flex-col items-center justify-center p-8 outline-1 outline-slate-500 outline-dashed">
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
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
